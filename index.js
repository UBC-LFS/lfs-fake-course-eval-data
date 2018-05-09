const fs = require('fs')
const { promisify } = require('util')
const parse = require('csv-parse')
const assert = require('assert')

const fsWriteFile = promisify(fs.writeFile)
const fsReadFile = promisify(fs.readFile)

const evaluationDataName = 'rawDataAll.csv'
const evaluationDataStream = fs.createWriteStream(__dirname + '/' + evaluationDataName, { flags: 'a' })
const evaluationHeader = [
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

const enrollmentDataName = 'course_eval_enrollments-2009-2017WA.csv'
const enrollmentDataStream = fs.createWriteStream(__dirname + '/' + enrollmentDataName, { flags: 'a' })
const enrollmentHeader = [
  'crsnum','section','crsname','start_year','period','deptname','crstype','crsdesig','no_enrolled','active','resp_fac','blocks','sites','ct','xlist','crscode','crsstart','crsend','program'
]

const writeHeader = (header, fileName) => {
  return async () => { await fsWriteFile(__dirname + '/' + fileName, header + '\r\n') }
}

const writeEvaluationHeader = writeHeader(evaluationHeader, evaluationDataName)
const writeEnrollmentHeader = writeHeader(enrollmentHeader, enrollmentDataName)

const writeData = (fileName, fileDataStream) => {
  return async (arr) => {
    const file = await fsReadFile(__dirname + '/' + fileName)
    parse(file, {}, (err, data) => {
      assert.equal(null, err)
      fileDataStream.write(arr + '\r\n')
    })
  }
}

const writeEvaluationData = writeData(evaluationDataName, evaluationDataStream)
const writeEnrollmentData = writeData(enrollmentDataName, enrollmentDataStream)

// write data for a single course 
const writeCourseData = (surveyyear) => {
  const numEnrolled = randomIntFromInterval(20,200)
  const numEvals = Math.floor(Math.random() * numEnrolled) // number of evaluations
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

  // write enrollment data for the course
  const enrollmentArr = [
    crsnum.slice(0,-4), parseInt(crsnum.slice(-3)), crsname,5,
    surveyyear,crsnum.split(' ')[0],'Default','crsdesig',
    numEnrolled,'Y',resp_fac,,,,,,,,'General'
  ]
  writeEnrollmentData(enrollmentArr)

  // write evaluation data for the course
  for(let i = 0; i < numEvals; ++i) {
    let arr = []

    let mobile = randomIntFromInterval(0,1)                              // 0 or 1
    let gender = randomIntFromInterval(0,1) == 0 ? "Male" : "Female"     // male or female

    // random score from [1,5]
    let UMI1 = randomIntFromInterval(1,5)           
    let UMI2 = randomIntFromInterval(1,5)
    let UMI3 = randomIntFromInterval(1,5)
    let UMI4 = randomIntFromInterval(1,5)
    let UMI5 = randomIntFromInterval(1,5)
    let UMI6 = randomIntFromInterval(1,5)

    arr = [surveyname, datestart, dateclose, crsnum, crsname, crsyear, deptname, 
      crs_dir, resp_fac, eval_id, eval_uname, eval_email, tsubmit, mobile, gradyear, gender,
      research1, research2, research3, UMI1, UMI2, UMI3, UMI4, UMI5, UMI6]

    writeEvaluationData(arr)
  }
}

// returns a random integer from [min,max]
function randomIntFromInterval(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

function getRandomCourse() {
  const courses = [
    {
      crsnum: "APBI 200 001",
      crsname: "Introduction to Soil Science",
      crsyear: "2",
      deptname: "APBI",
      crs_dir: "David Smith",
      resp_fac: "David Smith",
      eval_uname: "NMXUE8X9BKL",
      eval_email: "david.smith@ubc.ca"
    },
    {
      crsnum: "APBI 210 001",
      crsname: "Vascular Plants",
      crsyear: "2",
      deptname: "APBI",
      crs_dir: "David Smith",
      resp_fac: "David Smith",
      eval_uname: "NMXUE8X9BKL",
      eval_email: "david.smith@ubc.ca"
    },
    {
      crsnum: "APBI 222 001",
      crsname: "Introduction to Horticulture",
      crsyear: "2",
      deptname: "APBI",
      crs_dir: "Jane Bo",
      resp_fac: "Jane Bo",
      eval_uname: "SOP38ZWO9",
      eval_email: "jane.bo@ubc.ca"
    },
    {
      crsnum: "APBI 244 001",
      crsname: "Introduction to Biometeorlogy",
      crsyear: "2",
      deptname: "APBI",
      crs_dir: "Jane Bo",
      resp_fac: "Jane Bo",
      eval_uname: "SOP38ZWO9",
      eval_email: "jane.bo@ubc.ca"
    },
    {
      crsnum: "APBI 260 001",
      crsname: "Agroecology I",
      crsyear: "2",
      deptname: "APBI",
      crs_dir: "Martha Kim",
      resp_fac: "Martha Kim",
      eval_uname: "X8V01MZZA",
      eval_email: "martha.kim@ubc.ca"
    },
    {
      crsnum: "APBI 265 001",
      crsname: "Sustainable Agricultre and Food Systems",
      crsyear: "2",
      deptname: "APBI",
      crs_dir: "Wendy Liu",
      resp_fac: "Wendy Liu",
      eval_uname: "PIZZA00TIME",
      eval_email: "wendy.liu@ubc.ca"
    },
    {
      crsnum: "APBI 290 001",
      crsname: "Introductory Topics in Applied Biology",
      crsyear: "2",
      deptname: "APBI",
      crs_dir: "Chris Lee",
      resp_fac: "Chris Lee",
      eval_uname: "CUP1260CU10",
      eval_email: "chris.lee@ubc.ca"
    },
    {
      crsnum: "APBI 311 001",
      crsname: "Comparative Cardiovascular Respiratory Osmoregulatory Physiology",
      crsyear: "3",
      deptname: "APBI",
      crs_dir: "Chris Lee",
      resp_fac: "Chris Lee",
      eval_uname: "CUP1260CU10",
      eval_email: "chris.lee@ubc.ca"
    },
    {
      crsnum: "APBI 312 001",
      crsname: "Reproductive and Digestive Physiology",
      crsyear: "3",
      deptname: "APBI",
      crs_dir: "Alexander Lee",
      resp_fac: "Alexander Lee",
      eval_uname: "KZK2245K8ZMSIO",
      eval_email: "alexander.lee@ubc.ca"
    },
    {
      crsnum: "APBI 314 001",
      crsname: "Animals and Society",
      crsyear: "3",
      deptname: "APBI",
      crs_dir: "Alexander Lee",
      resp_fac: "Alexander Lee",
      eval_uname: "KZK2245K8ZMSIO",
      eval_email: "alexander.lee@ubc.ca"
    },
    {
      crsnum: "APBI 315 001",
      crsname: "Animal Welfare and the Ethics of Animal Use",
      crsyear: "3",
      deptname: "APBI",
      crs_dir: "Alexander Lee",
      resp_fac: "Alexander Lee",
      eval_uname: "KZK2245K8ZMSIO",
      eval_email: "alexander.lee@ubc.ca"
    },
    {
      crsnum: "APBI 318 001",
      crsname: "Applied Plant Breeding",
      crsyear: "3",
      deptname: "APBI",
      crs_dir: "Guy Seuss",
      resp_fac: "Guy Seuss",
      eval_uname: "5K8ZMSZK224IO",
      eval_email: "guy.seuss@ubc.ca"
    },
    {
      crsnum: "APBI 401 001",
      crsname: "Soil Processes",
      crsyear: "4",
      deptname: "APBI",
      crs_dir: "Drake Potter",
      resp_fac: "Drake Potter",
      eval_uname: "ABC180ZUO",
      eval_email: "drake.potter@ubc.ca"
    },
    {
      crsnum: "APBI 402 001",
      crsname: "Sustainable Soil Management",
      crsyear: "4",
      deptname: "APBI",
      crs_dir: "Harry Park",
      resp_fac: "Harry Park",
      eval_uname: "AZK224IK8ZMO",
      eval_email: "harry.park@ubc.ca"
    },
    {
      crsnum: "LFS 100 001",
      crsname: "Introduction to Land Food and Community",
      crsyear: "1",
      deptname: "LFS",
      crs_dir: "John Smith",
      resp_fac: "John Smith",
      eval_uname: "MXUE8WMQMX9",
      eval_email: "john.smith@ubc.ca"
    },
    {
      crsnum: "LFS 250 001",
      crsname: "Land Food and Community I",
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
      crsnum: "GRS 290 001",
      crsname: "Global Issues in Cultural Context",
      crsyear: "2",
      deptname: "GRS",
      crs_dir: "Johnny Wang",
      resp_fac: "Johnny Wang",
      eval_uname: "PUMA28X0X9",
      eval_email: "johnny.wang@ubc.ca"
    },
    {
      crsnum: "GRS 290 104",
      crsname: "Global Issues in Cultural Context",
      crsyear: "2",
      deptname: "GRS",
      crs_dir: "Johnny Wang",
      resp_fac: "Johnny Wang",
      eval_uname: "PUMA28X0X9",
      eval_email: "johnny.wang@ubc.ca"
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
      eval_uname: "DPQ91MZ62J",
      eval_email: "timmy.anderson@ubc.ca"
    }
  ]

  const index = Math.floor(Math.random() * courses.length)
  return courses[index]
}

const generateCSV = () => {
  writeEvaluationHeader()
  writeEnrollmentHeader()

  writeCourseData("2017W2")
  writeCourseData("2017W2")
  writeCourseData("2017W2")
  writeCourseData("2017W2")
  writeCourseData("2017W1")
  writeCourseData("2017W1")
  writeCourseData("2016W2")
  writeCourseData("2016W1")
  writeCourseData("2015W2")
  writeCourseData("2015W2")
  writeCourseData("2015W1")
  writeCourseData("2015W1")
  writeCourseData("2016W2")
  writeCourseData("2016W1")
  writeCourseData("2015W2")
  writeCourseData("2015W2")
  writeCourseData("2015W1")
  writeCourseData("2015W1")
  console.log('Dummy data has been successfully generated in ' + __dirname)
}

generateCSV()