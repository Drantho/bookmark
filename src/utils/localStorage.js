const utils = {
    getAllBookmarks() {
        return JSON.parse(localStorage.getItem('bookmarks')) || [
            {
                folderName: 'work',
                children: [],
            },
            {
                folderName: 'school',
                children: [],
            },
            {
                folderName: 'entertainment',
                children: [],
            }
        ];
    },
    saveBookmark(bookmark, folderName) {
        const bookmarks = this.getAllBookmarks();
        bookmarks.find(folder => folder.folderName === folderName).children.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        return bookmarks;
    },
    saveFolder(folderName) {
        const bookmarks = this.getAllBookmarks();
        bookmarks.push({
            folderName: folderName,
            children: []
        });
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        return bookmarks;
    },
    async getBackground() {

        const background = localStorage.getItem('background-' + this.getToday()) || await this.getBingImage();

        return background;
    },
    async getBingImage() {
        console.log('getBingImage() fires');
        const bgImage = await fetch('https://bingdailyimage.herokuapp.com/')
            .then(response => response.json());
        const url = 'http://www.bing.com' + bgImage.images[0].url
        localStorage.setItem('background-' + this.getToday(), url)
        return localStorage.getItem('background-' + this.getToday());
    },
    getToday() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        return today;
    }
}

export default utils;