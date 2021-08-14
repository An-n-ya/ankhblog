export const store = {
    debug: true,
    state: {
        cateList: "",
    },
    setArticle(newValue) {
        if (this.debug)
            console.log("setMessageAction triggered with", newValue);
        this.state.cateList = newValue;
    },
    clearArticle() {
        if (this.debug) console.log("clearArticle triggered");
        this.state.cateList = "";
    },
};