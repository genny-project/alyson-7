import {
  compose,
  map,
  prop,
  filter,
  has,
  mergeAll,
  mapObjIndexed,
  not,
  pathOr,
  head,
  keys,
  any,
} from 'ramda'

const initialState = { SAM: { active: {}, cached: {} } }

const mapAndMergeAll = mapper =>
  compose(
    mergeAll,
    map(mapper),
  )

const isMetaData = compose(
  not,
  has('parentCode'),
)

const reducer = (state = initialState, { type, payload }) => {
  if (type === 'BASE_ENTITY_MESSAGE') {
    const messages = prop('items', payload)
    const firstMessage = head(messages)
    if (prop('code', firstMessage) === 'GRP_DASHBOARD_COUNTS') {
      const dashboard = {
        ...mapAndMergeAll(({ attributeName, value, attributeCode, baseEntityCode }) => ({
          [attributeCode]: { value, attributeName, baseEntityCode },
        }))(prop('baseEntityAttributes', firstMessage)),
      }

      return {
        ...state,
        ...{
          SAM: {
            ...pathOr({}, ['SAM'], state),
            dashboard: { ...dashboard },
          },
        },
      }
    }
  }
  if (type === 'SAM_MSG') {
    const messages = prop('messages', payload) || []
    const dataMessages = filter(has('parentCode'), messages)
    const metaDataMessages = filter(isMetaData, messages)

    const data = mapAndMergeAll(({ parentCode, items }) => ({
      [parentCode]: {
        data: map(({ code, baseEntityAttributes }) => ({
          [code]: {
            ...mapAndMergeAll(({ attributeCode, valueString }) => ({
              [attributeCode]: valueString,
            }))(baseEntityAttributes),
          },
        }))(items),
      },
    }))(dataMessages)

    const metaData = mapAndMergeAll(({ items }) => ({
      ...mapAndMergeAll(({ code, baseEntityAttributes }) => ({
        [code]: {
          ...mapAndMergeAll(attribute => ({
            [prop('attributeCode', attribute)]: attribute,
          }))(baseEntityAttributes),
        },
      }))(items),
    }))(metaDataMessages)

    const fullData = mapObjIndexed((val, key) => ({
      ...val,
      metaData: { ...(prop(key, metaData) || {}) },
    }))(data)

    const key = head(keys(fullData))

    const isBucket = key => any(test => key.indexOf(test) >= 0)(['APPLICATIONS'])

    if (!isBucket(key)) {
      return {
        ...state,
        ...{
          SAM: {
            active: { ...fullData },
            cached: {
              ...pathOr({}, ['SAM', 'cached'], state),
              ...pathOr({}, ['SAM', 'active'], state),
            },
          },
        },
      }
    }
    return {
      ...state,
      ...{
        SAM: {
          active: { ...pathOr({}, ['SAM', 'active'], state), ...fullData },
          cached: {
            ...pathOr({}, ['SAM', 'cached'], state),
            ...pathOr({}, ['SAM', 'active'], state),
          },
        },
      },
    }
  } else {
    return state || {}
  }
}

export default reducer