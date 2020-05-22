import ttsObject from './object';

export default ({ texture, contents, cardRows, cardColumns, ...object }) => ({
    ...ttsObject(object),
    SidewaysCard: false,
    DeckIDs: contents,
    CustomDeck: {
        1: {
            FaceURL: texture,
            BackURL: texture,
            NumWidth: cardRows,
            NumHeight: cardColumns,
            BackIsHidden: true,
            UniqueBack: false,
        },
    },
});
