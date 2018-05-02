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

const writeCourseData = () => {
  const numEvals = randomIntFromInterval(1,60) // number of evaluations
  const surveyname = "LFS Instructor/Course Evaluation 2017SA"
  const datestart = ""
  const dateclose = ""
  const crsnum = "APBI 100 98A"
  const crsname = "Soil and Global Environment"
  const crsyear = "1"
  const deptname = "APBI"
  const crs_dir = "INSTRUCTOR NAME"
  const resp_fac = "INSTRUCTOR NAME"
  const eval_id = ""
  const eval_uname = "WEUIF89MZX9F9"
  const eval_email = "john.smith@ubc.ca"
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

const generateCSV = () => {
  writeHeader()
  writeCourseData()
  writeCourseData()
  writeCourseData()
  writeCourseData()
}

generateCSV()