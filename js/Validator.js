class Validator {
    static isValid(data) { // object
        const { title } = data;
        return Validator.titleIsValid(title)
    }

    static titleIsValid(title) {
        // const pattern = /[Aa-Zz]*+\!*+\?*+\:*+\s*+\-*+\.*+\,/gi;
        if (title.length > 2 && title.length < 20) {
            if (title[0] === title[0].toUpperCase()) {
                return true;
            }
        }

        function checkCharcode(title) {
            for (let i = 0; i < title.length; i++) {
                console.log(title.charCodeAt(i))
            }
        }
        checkCharcode(title);

        return false;
    }
}