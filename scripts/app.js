//find and create elements
  const $studentList = $('.student-list')
  const $students = $studentList.children()
  const listLength = $studentList.children().length
  const $studentSearch = $('<div class="student-search"></div>')
  const $header = $('.page-header')
  const $pagination = $('<div class="pagination"><ul></ul></div>')
//change properties
  $studentSearch.html('<input placeholder="Search for students..."><button>Search</button>')

  console.log($students[0])
//add pagination
    function displayStudents (event) {
      event.preventDefault()
      alert(+(this.text()))
    }
    function pagesRequired (numStudents) {
      if(numStudents <= 10)
        return 0
      else
        return Math.floor(numStudents / 10) + 1
    }
    function addSearch (numStudents) {
      if(numStudents > 10){
        $header.append($studentSearch)
      }
    }
    function addPagination (pagesNeeded) {
      $studentList.append($pagination)
      if(pagesNeeded > 0){
        for(var i = 1; i <= pagesNeeded; i++){
          if(i === 1)
            $pagination.append('<li><a class="active" href="#">1</a></li>')
          else
            $pagination.append('<li><a href="#">'+ i + '</a></li>')
        }
      }
    }

  function hideAllStudents () {
    $students.map( (val, el) => $(el).css("display", "none"))
  }
  function displayFirst10 (numStudents) {
    const $hiddenStudents = $studentList.children('li:nth-child(n + 11)')
    $hiddenStudents.map( (val, el) => $(el).css("display", "none")) //should probably build a helper method
  }

  function displayStudentRange (i) {
    hideAllStudents()
    if(i === 1) {
      const showStudents = $studentList.children('li:nth-child(-n + 10)')
      showStudents.map( (val, el) => $(el).css("display", "block"))
    }
    else {
      const showStudents = $studentList.children('li:nth-child(n + ' + (10 * (i - 1) + 1) + '):nth-child(-n +' + (i  * 10) + ')')
      showStudents.map( (val, el) => $(el).css("display", "block"))
    }
  }
  
  function queryStudents(){
    hideAllStudents()
    $students.filter( (i, student) => {
      const studentName = $(student).find('h3').text().toLowerCase()
      const emailText = $(student).find('span').text().toLowerCase()
      if(studentName.indexOf($(this).val()) != -1 || emailText.indexOf($(this).val()) != -1)
          $(student).css("display", "block")
    })
  }

  addSearch(listLength)
  displayFirst10(listLength)
  addPagination(pagesRequired(listLength))
//when pagination is clicked, it should show the appropriate records
  $('li a').on("click", function(event){
    event.preventDefault()
    $('ul').find('li a.active').removeClass("active")
    $(this).addClass('active')
    //Call function for displaying records
      displayStudentRange(+$(this).text())
  })
  
//when words in search input change, the records should be queried
  $('body').on("input", "input", queryStudents)
