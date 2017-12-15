(function () {
    
        function ispalindrome(str) {
            str = str.toLowerCase();
            str = str.replace(/\W/g, '');
            str = str.trim();
            for (i = 0; i < str.length/2; i++) {
                if (str.charAt(i) != str.charAt(str.length - i - 1))
                    return false;
            }
            return true;
        }
    
        const staticForm = document.getElementById("static-form");
    
        if (staticForm) {
            const textInput = document.getElementById("text-input");
            let list = document.getElementById("check-list");
    
            staticForm.addEventListener("submit", (event) => {
                event.preventDefault();
    
                try {
                    if (textInput.value.length < 1)
                        throw "empty";
    
                    var entry = document.createElement('li');
                    entry.appendChild(document.createTextNode(textInput.value));
                    if (ispalindrome(textInput.value))
                        entry.className = "is-palindrome";
                    else
                        entry.className = "not-palindrome";
                    list.appendChild(entry);
                } catch (e) {
                    alert("invalid inputs, please provide string as value in textarea");
                }
            });
        }
    })();