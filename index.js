var category = function () {
    let categories = [{ Id: 1, Pid: 0, Name: "Root" }];
    let addCategoty = function (pId, name) {
        let newId = categories[categories.length - 1].Id + 1;
        categories.push({ Id: newId, Name: name, Pid: Number(pId) });
        addNewCategoryToDropDown(newId, name);
        buildTree();
    };

    let load = function () {

        categories.forEach(x => {
            addNewCategoryToDropDown(x.Id, x.Name);
        });
    };

    let deleteNode = function (selectedCategories) {
         categories = categories.filter(x => !selectedCategories.includes(x.Id))
            .filter(x => !selectedCategories.includes(x.Pid));
        let select = document.getElementById("dropdown");
        select.innerHTML = '';
        load();
        buildTree();
    };

    function addNewCategoryToDropDown(id, name) {
        let select = document.getElementById("dropdown");
        let option = document.createElement("option");
        option.text = name;
        option.value = id;
        select.add(option);

    }

    function buildTree() {
        let ul = document.getElementById("categoryTree");
        ul.innerHTML = '';
        categories.forEach(x => {
            var parentLi = document.getElementById('li' + x.Pid);
            if (parentLi != null && x.Pid !== 0) {
                let subparentul = parentLi.querySelector("#" + 'ul' + x.Pid);
                let subparentli = parentLi.querySelector("#" + 'li' + x.Pid);
                let li = document.createElement("li");
                li.id = 'li' + x.Id;
                li.innerText = x.Name;
                let checkbox = document.createElement("input");
                checkbox.id = x.Id;
                checkbox.type = "checkbox";
                checkbox.title = x.Name;
                checkbox.name = "mychk";
                li.appendChild(checkbox);
                if (subparentul != null) {
                    subparentul.appendChild(li);

                }
                else if (subparentli != null) {
                    let ul = document.createElement("ul");
                    ul.id = 'ul' + x.Pid;
                    ul.appendChild(li);
                    subparentli.appendChild(ul);
                } else {
                    let ul = document.createElement("ul");
                    ul.id = 'ul' + x.Pid;
                    ul.appendChild(li);
                    parentLi.appendChild(ul);
                }


            } else {
                let li = document.createElement("li");
                li.id = 'li' + x.Id;
                li.innerText = x.Name;
                ul.appendChild(li);
            }
        });
    }

    return {
        load: load,
        add: addCategoty,
        tree: buildTree,
        delete: deleteNode
    }

};