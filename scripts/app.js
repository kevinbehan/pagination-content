//create the student search container and add it to the page header
const pageHeader = document.querySelector(".page-header")
const studentSearch = document.createElement("div")
studentSearch.classList.add("student-search")
pageHeader.appendChild(studentSearch)

//create search button and input and set their respective attributes
const searchInput = document.createElement("input")
searchInput.setAttribute("type", "text")
searchInput.setAttribute("placeholder", "Search for students...")

const searchButton = document.createElement("button")
searchButton.innerText = "Search"

//add the search input and button to the student search container
studentSearch.appendChild(searchInput)
studentSearch.appendChild(searchButton)

//create the pagination container and add it to the page
const page = document.querySelector(".page")
const paginationContainer = document.createElement("div")
paginationContainer.classList.add("pagination")
page.appendChild(paginationContainer)

//store all student records
const studentRecords = Array.from(document.querySelectorAll(".student-item"))

//Making sure I found the correct number of student records                                                 
console.assert(studentRecords.length === 54, 
            `${studentRecords.length} students were shown instead of 54`)

/****
  expandedStudentRecords: studentRecordElements -> studentRecordElements
  Turns each studentRecord into an array with the element itself and its student's
  name, and its student's email
****/ 
function expandStudentRecords(records){
  return records.map( (record) => {
    return [
      record, 
      record.querySelector("h3").innerText, 
      record.querySelector(".email").innerText
    ]
  })
}

//Testing expandedStudentRecords with the name from the first record
console.assert(expandStudentRecords(studentRecords)[0][1] === "iboya vat", 
               `${expandStudentRecords(studentRecords)[0][1]} was returned instead of iboya vat`)

const expandedStudentRecords = expandStudentRecords(studentRecords)
/****
  hideAllStudents: () -> void
  Iterates over an array of studentRecords and maps
  the ghost class over each element so that the records
  don't display.
****/
const hideAllStudents = () => studentRecords.map( record => record.classList.add("ghost"))  
/****
  displayStudents: number number -> studentRecordElements
  Takes a start index and an end index to display a specific set of students
****/
function displayStudents(startIndex, endIndex){
  hideAllStudents()
  const selectedRecords = studentRecords.slice(startIndex, endIndex)
  selectedRecords.map( record => record.classList.remove("ghost"))
} 
displayStudents(0, 10) 

/****
  displayedStudentCount: () -> number
  Identifies how many elements are displayed by subtracting the "ghosted"
  student records from the total student records
****/
function displayedStudentCount(){
  return document.querySelectorAll(".student-list li:not(.ghost)").length
}

//Testing student count when 10 records are displayed
console.assert(displayedStudentCount() === 10, 
               `${displayedStudentCount()} student records are shown instead of 10`)

/****
  getSearchValue: () -> string
  Gets the input value from the searchInput element
****/
const getSearchValue = () => searchInput.value


//Bind displayMatchedStudents to searchButton's onclick
searchButton.addEventListener("click", displayMatchedStudents)

function filterNonMatchedStudents(studentRecords){
  const filteredRecords = studentRecords.filter( (recordInfo) => {
    const record = recordInfo[0] //pull the record element out of the array
    const name = recordInfo[1] //pull the name out of the array
    const email = recordInfo[2] //pull the email out of the array
    const searchValue = getSearchValue()
    if(name.indexOf(searchValue) != -1 || email.indexOf(searchValue) != -1){
      return record
    }  
  })
  return filteredRecords
}

function displayMatchedStudents(){
  hideAllStudents()
  const filteredStudents = filterNonMatchedStudents(expandedStudentRecords)
  filteredStudents.map( (recordInfo, index) => {
    if(index < 10)
    recordInfo[0].classList.remove("ghost")                                     
  })
  emptyPagination()
  displayPagination(calcPagination(filteredStudents.length))
  if(filteredStudents.length > 10){
    makePageActive(paginationContainer.querySelector("li a"))
  }
}
/****
  calcPagination: number -> number
  Calculates how many pagination divs are needed based on how many
  students are currenty displayed
****/
function calcPagination(studentCount, recordsPerPage = 10){
  return studentCount <= 10 ? 0 : Math.ceil( studentCount / recordsPerPage)
}
console.assert(calcPagination(14) === 2, `${calcPagination(14)} pages were advised instead of 2`)
console.assert(calcPagination(9) === 0, `${calcPagination(9)} pages were advised instead of 0`)
/****
  displayPagination: number -> void
  Adds pagination to the bottom of the student page depending on how many students
  are currenty displayed
****/
function displayPagination(pagesNeeded){
  _.range(1, pagesNeeded + 1).map( (val, index, arr)=>{
    console.log(arr)
    const numberedPage = document.createElement("li")
    numberedPage.innerHTML = `<a href="#">${val}</a>`
    numberedPage.addEventListener("click", displayPage)
    paginationContainer.appendChild(numberedPage)
  })
}
/****
  displayPage: () -> void
  Takes the value from a numberedPage and uses it to display the appropriate
  page of students
****/
function displayPage(evt){
  evt.preventDefault()
  const pageValue = +(this.innerText)
  paginationContainer.querySelector(".active").classList.remove("active")
  this.querySelector("a").classList.add("active") //get the anchor inside the li
  displayStudents((pageValue * 10) - 10, pageValue * 10)
}
displayPagination(calcPagination(studentRecords.length)) //create pagination for all records on load
/****
  makePageActive: element -> void
  Takes a page element and makes it active
****/
function makePageActive(page){
  page.classList.add("active")
}
const firstPage = paginationContainer.querySelector("li a") //selects and stores the first page
makePageActive(firstPage) //make first page active on load

/****
  emptyPagination: () -> void
****/
function emptyPagination(){
  paginationContainer.innerHTML = ""
}
