
export type Tag = {
    categories?: Array<string>
    tags?: Array<string>
}

export const customTags: { [index: string]: Tag } = {
    add: {
        categories: [],
        tags: [
            "more"
        ]
    },
    whatshot: {
        categories: [],
        tags: [
            "lit",
            "flame"
        ]
    },

    wc: {
        categories: [],
        tags: [
            "toilet"
        ]
    },

};

