class Validator {
    static isValid(data) { // object
        const { title } = data;
        return Validator.titleIsValid(title)
    }

    static titleIsValid(title) {



        // Charcodes
        // (65  - 90) - английские в верхнем регистре
        // (97  - 122) - английские в нижнем регистре
        // (128 - 175) - кириллица часть 1
        // (224 - 247) - кириллица часть 2

        // Специальные символы 
        // 32, 33,  44, 45, 46, 58, 63
        let counter = 0;

        function testCharcode(code) {
            if (title.length > 2 && title.length < 20) {
                if (title[0] === title[0].toUpperCase()) {
                    if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122) ||
                        (code >= 128 && code <= 175) || (code >= 224 && code <= 247) || code >= 1039) {
                        // console.log('char good');
                        counter++;
                    }
                    else {
                        switch (code) {
                            case 32: { counter++; break; }
                            case 33: { counter++; break; }
                            case 44: { counter++; break; }
                            case 45: { counter++; break; }
                            case 46: { counter++; break; }
                            case 58: { counter++; break; }
                            case 63: { counter++; break; }
                        }
                    }
                }
            }
        }

        function checkCharcode(title) {
            for (let i = 0; i < title.length; i++) {
                testCharcode(title.charCodeAt(i))
            }
        }
        checkCharcode(title);

        if (title.length > counter) {
            return false
        }

        return true;
    }
}