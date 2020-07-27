import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme=>({
    hero:{
        backgroundImage:'url(/images/enroll.jpg)',
        backgroundSize:'cover',
        backgroundPositionY:'center',
    },
    title:{
        backgroundColor:'#00131b87',
        padding:theme.spacing(14,3,8,3),
        [theme.breakpoints.down('sm')]: {
            padding:theme.spacing(9,2,3,2)
        },
        display:'flex',
        justifyContent:'center',
        flexDirection:'column',
        alignItems:'center'
    },
    details:{
        padding:theme.spacing(6)
    },
    list:{
        padding:theme.spacing(0,6,6,6)
    }
}))

const Enrollment = props => {

    const classes = useStyles()

    return ( 
        <div>
            <div className={classes.hero}>
                <div className={classes.title}>
                    <Typography style={{color:'#d7d7d7'}} variant='h1'>Enrollment</Typography>
                </div>
            </div>
            <div className={classes.details}>
                <Typography style={{marginBottom:'32px'}} align='center' variant='h4'>Enrollment Procedures into the SSDO-VTI Programs:</Typography>
                <Typography>
                    Enrollment into the SSDO-VTI Courses and training is simple. The design of the training targets
                    any person and particularly, young men and women who have completed Secondary school and
                    primary education with or without formal certificate and also those who might have dropped out of
                    school The training shall offer both minor theoretical and major practical training modules.
                </Typography>
            </div>
            <div className={classes.list}>
                <Typography variant='h5'>Basic enrollment requirements or selection criteria</Typography>
                <Typography>The criterion for selection, acceptance and enrollment of students or trainees into the SSDO-VTI shall be based on the following requirements and procedures:</Typography>
                <ol style={{paddingLeft:'15px'}}>
                    <li><Typography>Applicant must have reached the age between 14 and 40 years old;</Typography></li>
                    <li><Typography>Applicant must be a South Sudanese;</Typography></li>
                    <li><Typography>Applicant must have or possess a Resident Certificate/Nationality Identification Card;</Typography></li>
                    <li><Typography>Applicant shall be required to present a South Sudan Secondary School or Primary Leaving Certificate or any other relevant educational transcript;</Typography></li>
                    <li><Typography>If need be, applicant shall be required to present a recommendation letter or letter of guarantee from a sponsorer.</Typography></li>
                </ol>
            </div>
            <div className={classes.list}>
                <Typography>
                    Interested persons are requested to pick the SSDO-VTI Application Forms from the Institute at its
                    Hai Gabat Residential Area along Yei – Lasu Road with a none refundable cost of two hundred
                    (200) South Sudanese pounds during working days from 8:00am to 5:00pm i.e Monday to Friday.
                    After the completion of the application form and processes, assessments and interviews, the
                    successful candidates shall be shortlist and served with admission form. The admission form shall
                    detail the tuition fees and other institution requirement accordingly. The admission form shall also
                    indicate the date for the start of the training.
                </Typography>
            </div>
            <div className={classes.list}>
                <Typography variant='h5'>Courses available at the SSDO-VTI</Typography>
                <Typography>SSDOVTI shall offer Technical Education and Vocational Training courses in the following program areas:</Typography>
                <ol style={{paddingLeft:'15px'}}>
                    <li><Typography>Solar PV Systems and Electrical Installation;</Typography></li>
                    <li><Typography>Building and Constructions;</Typography></li>
                    <li><Typography>Auto mechanic;</Typography></li>
                    <li><Typography>Agribusiness;</Typography></li>
                    <li><Typography>Catering and Hospitality Services;</Typography></li>
                    <li><Typography>Hairdressing and Beauty Therapy;</Typography></li>
                    <li><Typography>Employability and Self-Skills;</Typography></li>
                    <li><Typography>Tailoring and Garment Making;</Typography></li>
                    <li><Typography>Driving and Basic Mechanics as minor.</Typography></li>
                    <li><Typography>Trauma Awareness and Healing as Subsidiary Module</Typography></li>
                </ol>
            </div>
            <div className={classes.list}>
                <Typography variant='h5'>Training Duration</Typography>
                <Typography>
                    The training period shall take 9 (nine) months for a student to graduate with a Level 1 Proficiency
                    Certificate. The 9 months are divided into three phases each with three months. Student is required
                    to cover all the necessary Course Modules as required by the curriculum. A convincingly successful
                    student shall offer the next Level II Proficiency Certificate leads to a Diploma in Vocational Education and Training. Please see the calendar and programs below for more information on the
                    training duration.
                </Typography>
            </div>
        </div>
     );
}
 
export default Enrollment;