const fs = require('fs')
const { promisify } = require('util')
const parse = require('csv-parse')
const assert = require('assert')

const fsWriteFile = promisify(fs.writeFile)
const fsReadFile = promisify(fs.readFile)

const outputName = 'output.csv'
const stream = fs.createWriteStream(__dirname + '/output/' + outputName, { flags: 'a' })

const writeHeader = async () => {
  const header = [
    'surveyname',
    'datestart',
    'dateclose',
    'crsnum',
    'crsname',
    'crsyear',
    'deptname',
    'crs_dir',
    'resp_fac',
    'eval_id',
    'eval_uname',
    'eval_email',
    'tsubmit',
    'mobile',
    'gradyear',
    'gender',
    'research1',
    'research2',
    'research3',
    'The instructor made it clear what students were expected to learn.',
    'The instructor communicated the subject matter effectively.',
    'The instructor helped inspire interest in learning the subject matter.',
    'Overall  evaluation of student learning (through exams  essays  presentations  etc.) was fair.',
    'The instructor showed concern for student learning.',
    'Overall  the instructor was an effective teacher.'
  ]
  await fsWriteFile(__dirname + '/output/' + outputName, header + '\r\n')
}

const writeData = async (arr) => {
  const file = await fsReadFile(__dirname + '/output/' + outputName)
  parse(file, {}, (err, data) => {
    assert.equal(null, err)
    stream.write(arr + '\r\n')
  })
}

const writeCourseData = (surveyyear) => {
  const numEvals = randomIntFromInterval(1,100) // number of evaluations
  const course = getRandomCourse()

  const surveyname = "LFS Instructor/Course Evaluation " + surveyyear
  const datestart = ""
  const dateclose = ""
  const crsnum = course.crsnum
  const crsname = course.crsname
  const crsyear = course.crsyear
  const deptname = course.deptname
  const crs_dir = course.crs_dir
  const resp_fac = course.resp_fac
  const eval_id = ""
  const eval_uname = course.eval_uname
  const eval_email = course.eval_email
  const tsubmit = ""
  const gradyear = ""
  const research1 = ""
  const research2 = ""
  const research3 = ""
  
  // variables
  let mobile
  let gender  
  let UMI1            
  let UMI2 
  let UMI3 
  let UMI4 
  let UMI5 
  let UMI6

  for(let i = 0; i < numEvals; ++i) {
    let arr = []

    mobile = randomIntFromInterval(0,1)                              // 0 or 1
    gender = randomIntFromInterval(0,1) == 0 ? "Male" : "Female"     // male or female

    // random score from [1,5]
    UMI1 = randomIntFromInterval(1,5)           
    UMI2 = randomIntFromInterval(1,5)
    UMI3 = randomIntFromInterval(1,5)
    UMI4 = randomIntFromInterval(1,5)
    UMI5 = randomIntFromInterval(1,5)
    UMI6 = randomIntFromInterval(1,5)

    arr = [surveyname, datestart, dateclose, crsnum, crsname, crsyear, deptname, 
      crs_dir, resp_fac, eval_id, eval_uname, eval_email, tsubmit, mobile, gradyear, gender,
      research1, research2, research3, UMI1, UMI2, UMI3, UMI4, UMI5, UMI6]

    writeData(arr)
  }
}

// returns a random integer from [min,max]
function randomIntFromInterval(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

function getRandomCourse() {
  const courses = [
    {
      crsnum: "LFS 100 001",
      crsname: "Introduction to Land, Food and Community",
      crsyear: "1",
      deptname: "LFS",
      crs_dir: "John Smith",
      resp_fac: "John Smith",
      eval_uname: "MXUE8WMQMX9",
      eval_email: "john.smith@ubc.ca"
    },
    {
      crsnum: "LFS 250 001",
      crsname: "Land, Food and Community I",
      crsyear: "2",
      deptname: "LFS",
      crs_dir: "Tony Stark",
      resp_fac: "Tony Stark",
      eval_uname: "LKS4D9JFKL2",
      eval_email: "tony.stark@ubc.ca"
    },
    {
      crsnum: "HUNU 505 001",
      crsname: "Current Issues in Applied Nutrition",
      crsyear: "5",
      deptname: "HUNU",
      crs_dir: "William Lee",
      resp_fac: "William Lee",
      eval_uname: "KJL238X9Z",
      eval_email: "william.lee@ubc.ca"
    },
    {
      crsnum: "FRE 295 002",
      crsname: "Managerial Economics",
      crsyear: "2",
      deptname: "FRE",
      crs_dir: "Ed Parker",
      resp_fac: "Ed Parker",
      eval_uname: "MZ98POPLQZ9",
      eval_email: "ed.parker@ubc.ca"
    },
    {
      crsnum: "FRE 302 001",
      crsname: "Small Business Management in Agri-food Industries",
      crsyear: "3",
      deptname: "FRE",
      crs_dir: "Jennifer Berg",
      resp_fac: "Jennifer Berg",
      eval_uname: "A0OZP2L1L",
      eval_email: "jennifer.berg@ubc.ca"
    },
    {
      crsnum: "FOOD 500 001",
      crsname: "Small Business Management in Agri-food Industries",
      crsyear: "3",
      deptname: "FRE",
      crs_dir: "Jennifer Berg",
      resp_fac: "Jennifer Berg",
      eval_uname: "A0OZP2L1L",
      eval_email: "jennifer.berg@ubc.ca"
    },
    {
      crsnum: "GRS 390 001",
      crsname: "Global Issues in Cultural Context",
      crsyear: "3",
      deptname: "GRS",
      crs_dir: "Anne Lo",
      resp_fac: "Anne Lo",
      eval_uname: "GOO8X0X9",
      eval_email: "anne.lo@ubc.ca"
    },
    {
      crsnum: "FNH 200 001",
      crsname: "Exploring Our Food",
      crsyear: "2",
      deptname: "FNH",
      crs_dir: "Timmy Anderson",
      resp_fac: "Timmy Anderson",
      eval_uname: "DPQ91MZ62J",
      eval_email: "timmy.anderson@ubc.ca"
    },
    {
      crsnum: "FNH 200 102",
      crsname: "Exploring Our Food",
      crsyear: "2",
      deptname: "FNH",
      crs_dir: "Timmy Anderson",
      resp_fac: "Timmy Anderson",
      eval_uname: "KMMCOX1092F",
      eval_email: "timmy.anderson@ubc.ca"
    }
  ]

  const index = Math.floor(Math.random() * courses.length)
  return courses[index]
}

const generateCSV = () => {
  writeHeader()
  writeCourseData("2017W1")
  writeCourseData("2016W2")
  writeCourseData("2016W1")
  writeCourseData("2015W2")
  writeCourseData("2015W2")
  writeCourseData("2015W1")
  writeCourseData("2015W1")
}

generateCSV()