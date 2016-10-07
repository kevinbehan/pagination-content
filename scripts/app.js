//find and create elements
  const $studentList = $('.student-list')
  const $students = $studentList.children()
  const listLength = $studentList.children().length
  const $studentSearch = $('<div class="student-search"></div>')
  const $header = $('.page-header')
  const $pagination = $('<div class="pagination"><ul></ul></div>')
//change properties
  $studentSearch.html('<input placeholder="Search for students..."><button>Search</button>')

    //the algorithm that dictates how many tabs are needed for pagination
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
  
    //the display logic for adding pagination
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
  
  //used to display the right number of records based on search
  function resetPagination(pagesNeeded){
    $pagination.children().remove()
    if(pagesNeeded > 0){
      for(var i = 1; i <= pagesNeeded; i++){
        if(i === 1)
          $pagination.append('<li><a class="active" href="#">1</a></li>')
        else
          $pagination.append('<li><a href="#">'+ i + '</a></li>')
          const $hiddenStudents = $studentList.children('li:nth-child(n + 11)')
          $hiddenStudents.map( (val, el) => $(el).css("display", "none"))
      }
    }
  }

  function hideAllStudents () {
    $students.map( (val, el) => $(el).css("display", "none"))
  }
  function displayFirst10 (numStudents) {
    const $hiddenStudents = $studentList.children('li:nth-child(n + 11)')
    $hiddenStudents.map( (val, el) => $(el).css("display", "none")) //converting is a bitch
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
  /*
  function queryStudentsOnInput(){
    hideAllStudents()
    $students.filter( (i, student) => {
      const studentName = $(student).find('h3').text().toLowerCase()
      const emailText = $(student).find('span').text().toLowerCase()
      if(studentName.indexOf($(this).val()) != -1 || emailText.indexOf($(this).val()) != -1)
          $(student).css("display", "block")
    })
  }
  */

  //this hides the students, then displays the appropriate records based on the records
  //it also resets the pagination and the event listener for the pagination
  function queryStudents(){
    hideAllStudents()
    const students = $students.filter( (i, student) => {
      const studentName = $(student).find('h3').text()
      const emailText = $(student).find('span').text()
      const inputVal = $("input").val().toLowerCase()
      if(studentName.indexOf(inputVal) != -1 || emailText.indexOf(inputVal) != -1)
          $(student).css("display", "block")
    })
    const listLength = ($studentList.children(".student-item:visible").length)
    resetPagination(pagesRequired(listLength))
    listenForPaginationClick()
  }

  addSearch(listLength)
  displayFirst10(listLength)
  addPagination(pagesRequired(listLength))
  listenForPaginationClick()
//when pagination is clicked, it shows the appropriate records
  function listenForPaginationClick() { 
      $('li a').on("click", function(event){
      event.preventDefault()
      $('ul').find('li a.active').removeClass("active")
      $(this).addClass('active')
      //Call function for displaying records
        displayStudentRange(+$(this).text())
    })
  }
//when the search button is clicked, students are shown if their email or name match the input
  $('body').on("click", "button", queryStudents)
  
//when words in search input change, the records should be queried
  //$('body').on("input", "input", queryStudentsOnInput)
  //With this feature there's not really a point to having a search button
