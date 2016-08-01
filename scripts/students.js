//Fill main container with student records
  //create student collection
const students = [
  {
    firstName: "Kevin",
    lastName: "Behan",
    imageLink: "http://lorempixel.com/400/200/",
    joinDate: "07.12.15",
    createFullName:()=> this.firstName + " " + this.lastName
  },
  {
    firstName: "Kevin",
    lastName: "Behan",
    imageLink: "http://lorempixel.com/400/200/",
    joinDate: "07.12.15"
  },
  {
    firstName: "Kevin",
    lastName: "Behan",
    imageLink: "http://lorempixel.com/400/200/",
    joinDate: "07.12.15"
  },
  {
  firstName: "Kevin",
  lastName: "Behan",
  imageLink: "http://lorempixel.com/400/200/",
  joinDate: "07.12.15",
  createFullName:()=> this.firstName + " " + this.lastName
  },
  {
  firstName: "Kevin",
  lastName: "Behan",
  imageLink: "http://lorempixel.com/400/200/",
  joinDate: "07.12.15"
  },
  {
  firstName: "Kevin",
  lastName: "Behan",
  imageLink: "http://lorempixel.com/400/200/",
  joinDate: "07.12.15"
  },
  {
  firstName: "Kevin",
  lastName: "Behan",
  imageLink: "http://lorempixel.com/400/200/",
  joinDate: "07.12.15",
  createFullName:()=> this.firstName + " " + this.lastName
  },
  {
  firstName: "Kevin",
  lastName: "Behan",
  imageLink: "http://lorempixel.com/400/200/",
  joinDate: "07.12.15"
  },
  {
  firstName: "Kevin",
  lastName: "Behan",
  imageLink: "http://lorempixel.com/400/200/",
  joinDate: "07.12.15"
  },
  {
  firstName: "Kevin",
  lastName: "Behan",
  imageLink: "http://lorempixel.com/400/200/",
  joinDate: "07.12.15",
  createFullName:()=> this.firstName + " " + this.lastName
  },
  {
  firstName: "Kevin",
  lastName: "Behan",
  imageLink: "http://lorempixel.com/400/200/",
  joinDate: "07.12.15"
  },
  {
  firstName: "Kevin",
  lastName: "Behan",
  imageLink: "http://lorempixel.com/400/200/",
  joinDate: "07.12.15"
  }
]
const studentCount = students.length
const mainContainer = document.getElementsByClassName('main-container')[0]
const footer = document.getElementsByTagName("footer")[0]
  //iterate over collection
function sizeImg(img, width, height){
  img.setAttribute("width", width)
  img.setAttribute("height", height)
}
function createStudentCountMarkup (students){
    const studentCountParagraph = document.createElement("p")
    if(studentCount > 10){
      studentCountParagraph.innerText = `students 1 - 10 out of ${studentCount}`
      return studentCountParagraph
    }
    else if(studentCount > 0){
      studentCountParagraph.innerText = `students 1 - ${studentCount}`
      return studentCountParagraph
    }
    else {
      studentCountParagraph.innerText = "0 students found"
      return studentCountParagraph
    }
}
function printStudentCount(){
  const header = document.getElementsByTagName("header")[0]
  const input = document.querySelector("input")
  header.insertBefore(createStudentCountMarkup(students), input)
}
printStudentCount()

function createStudentRecords () { 
  students.map( (student) => {
    const studentContainer = document.createElement('div')
    studentContainer.classList.add('student-container')
    mainContainer.appendChild(studentContainer)
    
    const studentImage = document.createElement("img")
    const fullName = document.createElement("p")
    const joinDate = document.createElement("p")
    studentImage.setAttribute("src", student.imageLink)
    sizeImg(studentImage, 50, 50)
    fullName.innerText = `${student.firstName} ${student.lastName}`
    joinDate.innerText = student.joinDate 

    studentContainer.appendChild(studentImage)
    studentContainer.appendChild(fullName)
    studentContainer.appendChild(joinDate).classList.add("float-right")
  })
}

function createPagination(numPages){
  for(var i = 1; i <= numPages + 1; i++){
    const span = document.createElement("span")
    span.innerText = i 
    footer.appendChild(span)
    if(i === 1){
      span.classList.add("pagination-selected")      
    }
    else{
      span.classList.add("pagination")  
    }
  }
}
function paginate(){
  if(studentCount > 10){
    var pageCount = Math.floor(studentCount / 10)
    createPagination(pageCount)
  }
}

createStudentRecords()
paginate()
    //create student container and concatenate markup
      //create elements in container

      //set src attribute equal to img url
      //set full name //create full name function
        //add first name to space to last name
      //set text for last paragraph as joinedDate
    //append student container to main container
  