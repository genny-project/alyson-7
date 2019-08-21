import { prefixedLog, isArray } from '../../utils';
import { store } from '../../redux';
import * as events from './events';

class MessageHandler {
  constructor() {
    this.log = prefixedLog( 'MessageHandler' );
    this.lastBe = new Date().getTime();
    this.beBatch = [];
    this.dispatchHistory = [];

    setInterval( this.checkMessageBatch, 200 );
    // setInterval( this.checkDispatchHistory, 500 );
  }

  validMessageTypes = ['DATA_MSG', 'CMD_MSG', 'EVT_MSG'];

  eventTypes = {
    DATA_MSG: 'data_type',
    CMD_MSG: 'cmd_type',
    EVT_MSG: 'event_type',
  };

  checkMessageBatch = () => {
    if ( this.beBatch.length > 0 && new Date().getTime() - this.lastBe > 200 ) {
      this.drainMessageBatch();
    }
  };

  removeMessageFromDispatcHistory = message => {
    this.dispatchHistory = this.dispatchHistory.filter( item => item.msg_id !== message.msg_id );
  };

  addMessageToDispatchHistory = message => {
    this.dispatchHistory.push( message );

    setTimeout(() => {
      this.removeMessageFromDispatcHistory( message );
    }, 5000 );
  };

  drainMessageBatch = () => {
    // console.log( 'this.beBatch ', this.beBatch.length, JSON.stringify({ batch: this.beBatch }));

    const message = this.beBatch.reduce( this.handleReduceMessageBatch, this.beBatch[0] );

    // console.log( 'drain message', message );

    store.dispatch( message );

    if ( message.is_cached_message ) {
      this.addMessageToDispatchHistory( message );
    }

    this.beBatch = [];
  };

  handleReduceMessageBatch = ( output, current ) => {
    /**
     * If the message has an aliasCode process it individually.
     * Additionally don't apply this to aliasCodes that match
     * the parentCode as this eliminates a large number of
     * individual messages, increasing performance.
     */
    if ( current.payload.aliasCode && current.payload.aliasCode !== current.payload.parentCode ) {
      const message = {
        ...current,
        links: current.questions ? current.links.concat( current.questions ) : current.links,
      };

      store.dispatch( message );

      if ( message.is_cached_message ) {
        this.addMessageToDispatchHistory( message );
      }

      return output;
    }

    output.payload.items = [
      ...output.payload.items.filter(
        item => !current.payload.items.some( newItem => newItem.code === item.code )
      ),
      ...current.payload.items.map( item => ({
        delete: current.payload.delete,
        replace: current.payload.replace,
        shouldDeleteLinkedBaseEntities: current.payload.shouldDeleteLinkedBaseEntities,
        parentCode: current.payload.parentCode,
        totalCount: current.payload.returnCount,
        linkCode: current.payload.linkCode,
        ...item,
        links: item.questions ? item.links.concat( item.questions ) : item.links,
      })),
    ];

    return output;
  };

  onMessage = message => {
    if ( !message ) return;

    const { msg_type, data_type, messages } = message;
    const isValidMessage = this.validMessageTypes.includes( msg_type );

    if ( !isValidMessage && data_type !== 'QBulkMessage' ) {
      this.log(
        `Ignoring message of type ${msg_type}. Must be one of the following: ${this.validMessageTypes.join(
          '|'
        )}`,
        'warn'
      );

      return;
    }

    if ( data_type === 'QBulkMessage' && isArray( messages, { ofMinLength: 1 })) {
      messages.forEach( this.onMessage );

      return;
    }

    const eventType = this.eventTypes[msg_type];
    const event = message[eventType];
    const action = events[event];

    if ( !action ) {
      this.log(
        `Could not find action for type of '${eventType}'! (derived from message type '${msg_type}')`,
        'warn'
      );

      return;
    }

    if ( message.data_type === 'BaseEntity' && !message.delete && !message.replace ) {
      /* Add to a batch */
      this.beBatch.push( action( message ));

      this.lastBe = new Date().getTime();
    } else {
      const payload = message;

      if ( isArray( payload.items )) {
        payload.items = payload.items.map( item => ({
          shouldDeleteLinkedBaseEntities: payload.shouldDeleteLinkedBaseEntities,
          parentCode: payload.parentCode,
          delete: payload.delete,
          totalCount: payload.returnCount,
          replace: payload.replace,
          ...item,
          links: item.questions ? item.links.concat( item.questions ) : item.links,
        }));
      }

      store.dispatch( action( payload ));

      if ( payload.is_cached_message ) {
        this.addMessageToDispatchHistory( payload );
      }
    }
  };
}

export default MessageHandler;
