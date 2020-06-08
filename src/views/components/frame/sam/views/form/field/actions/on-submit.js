import Bridge from '../../../../../../../../utils/vertx/Bridge';
import debounce from 'lodash.debounce';

const onSubmit = ({ parentCode, rootCode, setLoading }) => ({ ask, value }) => {
  const { attributeCode, questionCode, sourceCode, targetCode } = ask;

  setLoading(true);

  Bridge.sendFormattedEvent({
    code: questionCode,
    parentCode,
    rootCode,
    targetCode,
    eventType: 'BTN_CLICK',
    messageType: 'BTN',
    value,
  });
};

const debouncedOnSubmit = debounce(onSubmit, 400);

export default debouncedOnSubmit;
