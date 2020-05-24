import ttsObject from './object';

export default ({ texture, cardCount, cardRows, cardColumns, ...object }) => ({
    ...ttsObject(object),
    Name: 'Deck',
    SidewaysCard: false,
    DeckIDs: Array(cardCount).fill(null).map((_, index) => index + 100),
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
