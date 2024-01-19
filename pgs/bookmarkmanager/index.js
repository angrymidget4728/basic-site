function addBookmarkWindow() {
    document.getElementById('add-b-window').style.display = "flex";
}

function closeAddBookmark () {
    document.getElementById('add-bookmark-form').reset();
    document.getElementById('add-b-window').style.display = "none";
}

document.getElementById('add-bookmark-form').addEventListener('submit', function (event) {
    const markName = document.getElementById('markName').value;
    const markUrl = document.getElementById('markUrl').value;
    const markId = genRandHex(6);

    if (!validateUrl(markUrl)){
        alert('Invalid URL. Try again');
        return;
    }

    // const markCat = 'Category A'
    const menu = document.getElementById('b-category');
    const markCat = menu.options[menu.selectedIndex].text;
    // console.log(markCat);
    
    var bookmarkObj = {
        title: markName,
        url: markUrl,
        category: markCat,
        id: markId
    };
    
    var listOfBookmarks = [];
    
    if (localStorage.getItem('listOfBookmarks')) listOfBookmarks = JSON.parse(localStorage.getItem('listOfBookmarks'))
    
    listOfBookmarks.push(bookmarkObj)
    localStorage.setItem('listOfBookmarks', JSON.stringify(listOfBookmarks));
    
    addEntry(generateEntryHTML(markName, markUrl, markId), markCat);
    closeAddBookmark();
    
    // console.log(markName, markUrl);
    event.preventDefault();
})

function loadBookmarks(){
    loadCategories();
    var listOfBookmarks = JSON.parse(localStorage.getItem('listOfBookmarks'));
    if(localStorage.getItem('listOfBookmarks')){
        for (var i=0; i<listOfBookmarks.length; i++){
            addEntry(
                generateEntryHTML(
                    listOfBookmarks[i].title, 
                    listOfBookmarks[i].url, 
                    listOfBookmarks[i].id
                ), 
                listOfBookmarks[i].category
            );
            // console.log(document.getElementById(listOfBookmarks[i].id))
        }
    }

}

function showDetails(id){
    var listOfBookmarks = JSON.parse(localStorage.getItem('listOfBookmarks'));
    // console.log(id);
    var item = null;
    for (var i=0; i<listOfBookmarks.length; i++){
        if(listOfBookmarks[i].id==id){
            item = listOfBookmarks[i];
            break;
        }
    }
    console.log(item);
    document.getElementById('b-details-window').style.display = 'block';
    document.getElementById('b-title-value').innerHTML = item.title;
    document.getElementById('b-url-value').innerHTML = item.url;
    document.getElementById('b-category-value').innerHTML = item.category;
}

function addEntry(item, category){
    const categoryElem = document.getElementById(`${category.replace(/\s+/g, '-').toLowerCase()}-list`);
    // console.log(`${category.replace(/\s+/g, '-').toLowerCase()}-list`);
    categoryElem.innerHTML = categoryElem.innerHTML + item;
}

function generateEntryHTML(title, url, id) {
    var httpsURL = ''

    if(!url.startsWith('http')){
        httpsURL = 'https://' + url
    }

    const b_text = `
    <div class="b-text">
        <a href="${httpsURL}" target="_blank">${title}</a>
    </div>`;

    const b_details = `
    <div class="b-details">
        <button type="button" class="details-button" id="${id}" onclick="showDetails(this.id)">Details</button>
    </div>`;

    const bookmark_item = `
    <div class="bookmark-item">
        ${b_text}
        ${b_details}
    </div>`;

    return bookmark_item;
}

function genRandHex(size){
    var hexID =  [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    while(document.getElementById(hexID)){
        hexID =  [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    }
    return hexID;
}

function loadCategories(){
    if (localStorage.getItem('listOfCategories')){
        var listOfCategories = JSON.parse(localStorage.getItem('listOfCategories'));
        for (var i=0; i<listOfCategories.length; i++) {
            appendNewCategory(listOfCategories[i]);
            generateNewCategoryBlock(listOfCategories[i]);
        }
    }
}

function confirmNewCategory(){
    const newCategoryField = document.getElementById('new-category');
    const newCategory = newCategoryField.value;

    var listOfCategories = [];
    if (localStorage.getItem('listOfCategories')) listOfCategories = JSON.parse(localStorage.getItem('listOfCategories'))

    if (!newCategory=='' && !listOfCategories.includes(newCategory)) {
        listOfCategories.push(newCategory);
        localStorage.setItem('listOfCategories', JSON.stringify(listOfCategories));

        appendNewCategory(newCategory);
        closeAddCategoryMode();
        generateNewCategoryBlock(newCategory);
    } else {
        alert('Invalid category. Try again or cancel.')
    }
    newCategoryField.value = '';
}

function appendNewCategory(newCategory) {
    // var catDropdown = document.getElementById('b-category');
    var newOption = `
    <option value="${newCategory.replace(/\s+/g, '-').toLowerCase()}">${newCategory}</option>
    `

    document.getElementById('b-category').innerHTML = document.getElementById('b-category').innerHTML + newOption;
    // console.log(document.getElementById('b-category').innerHTML);
}

function openAddCategoryMode(){
    document.getElementById('add-category').style.display = 'block';
    document.getElementById('use-category').style.display = 'none';
    document.getElementById('add-buttons-container').style.display = 'none';
}

function closeAddCategoryMode(){
    document.getElementById('new-category').value = '';
    document.getElementById('add-category').style.display = 'none';
    document.getElementById('use-category').style.display = 'block';
    document.getElementById('add-buttons-container').style.display = 'flex';
}

function generateNewCategoryBlock(categoryName){
    var newHTML = `
    <div class="category">
        <div class="category-title">${categoryName}</div>
        <div class="category-list" id="${categoryName.replace(/\s+/g, '-').toLowerCase()}-list">
        </div>
    </div>`

    document.getElementById('all-categories-col').innerHTML = document.getElementById('all-categories-col').innerHTML + newHTML;

    // return newHTML;
}

function validateUrl(url){
    var res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(res == null) return false;
    else return true;
}