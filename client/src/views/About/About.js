import React from 'react';
import { Typography, makeStyles, Paper, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme=>({
    hero:{
        backgroundImage:'url(/images/products/autoMechanic.jpg)',
        backgroundSize:'cover',
        backgroundPositionY:'center',
    },
    title:{
        backgroundColor:'#00131b87',
        padding:theme.spacing(14,3,8,3),
        [theme.breakpoints.down('sm')]: {
            padding:theme.spacing(9,2,4,2)
        },
    },
    paper:{
        padding:theme.spacing(4,2),
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column'
    },
    values:{
        backgroundImage:'url(/images/vision.jpg)',
        backgroundAttachment:'fixed'
    },
    cores:{
        padding:theme.spacing(2),
        height:'100%'
    },
    training:{
        padding:theme.spacing(4,6)
    },
    services:{
        //backgroundColor:'white',
        padding:theme.spacing(4,6),
        // backgroundColor:'#1d0f50e8'
    }
}))

const About = props => {

    const classes = useStyles()

    return ( 
        <div>
            <div className={classes.hero}>
                <div className={classes.title}>
                    <Typography style={{color:'white'}} variant='h2'>About Us</Typography>
                    <Typography style={{color:'#d7d7d7'}}>‘Institutte for Excellency, National Empowerment and Innovations for Positive Change in the Youth Mindset’</Typography>
                </div>
            </div>
            <Paper className={classes.paper}>
                <Typography variant='h4'>The SSDO-VTI Snapshot</Typography>
                <Typography align='justify' style={{width:'70%'}}>
                The South Sudanese Development Organization’s Vocational Training Institute (SSDO-VTI) is a
                community integrated and livelihood development programme of the South Sudanese Development
                Organization (SSDO) that provides technical education and vocational training opportunities for
                employability and self-skills development that are relevant to infrastructure development, alleviating
                poverty, improving innovations, reducing youth engagement in violent and political conflicts and
                enhancing household social and economic stability as required by the South Sudan’s non-formal
                competency based curriculum on Technical and Vocational Education Training (TVET).
                </Typography>
                <img src='/images/vision.jpg' alt='hero' style={{width:'85%',margin: '20px 0',}}/>
                <Grid container style={{width:'85%'}} spacing={4}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant='h4'>Our Mission Statemennt</Typography>
                        <Typography>
                            The SSDO-VTI mission shall strive to instill knowledge and skills that promote social economic
                            innovations and livelihood development and merchandize industrial production, increase household
                            income and provide the necessary supplies to meet the market diversification needs. To achieve this,
                            SSDO-VTI shall apply the necessary technology that is appropriate to advance knowledge and skills
                            to respond to any learning demand, act as an alarm signal and portent to curve off social and
                            economic life threats, scan and adopt to emerging situations and challenges to humanity.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant='h4'>Our Vision</Typography>
                        <Typography align='justify'>
                            implanted creativity and innovations skills that are relevant to sustainable human resource
                            development and stable livelihood economy in the society
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
            <div className={classes.values}>
                <div style={{backgroundColor:'#12083ae3',padding:'40px 32px'}}>
                    <Typography align='center' style={{padding:'0 0 20px 0',color:'white'}} variant='h3'>Our Core Drives and Values</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper className={classes.cores} elevation={5}>
                                <Typography style={{padding:'0 0 10px 0'}} align='center' variant='h5'>Relevancy of workmanship:</Typography>
                                <Typography color='textSecondary'>
                                    SSDO-VTI shall provide trainings that shall create self-motivated employment, improve
                                    infrastructure development, alleviate poverty, increase innovations and technological advancement
                                    and enhance economic stability.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper className={classes.cores} elevation={5}>
                                <Typography style={{padding:'0 0 10px 0'}} align='center' variant='h5'>Implanted social and economic creativity and innovations:</Typography>
                                <Typography color='textSecondary'>
                                    Training with SSDO-VTI shall be based on a free and self-motivated social and economic influence.
                                    It shall be built from the basic skills and knowledge that are marketable and easily incorporated and
                                    consistent with the technological advancement. The training shall promote the propagation of new
                                    ideas and practices that explore diversified skills and trigger economic growth.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper className={classes.cores} elevation={5}>
                                <Typography style={{padding:'0 0 10px 0'}} align='center' variant='h5'>Seeking to redress diversities and environmental inconsistency:</Typography>
                                <Typography color='textSecondary'>
                                    SSDO-VTI shall design its training to focus into the compass for drawing targeted solutions that are
                                    intended to redress short-comes that have long existed due to holographs in knowledge and ability
                                    to raise capital resources. These capital resources buildup and knowledge need to be instilled into the
                                    society to generate a network that links availability of raw materials, production and market
                                    accessibility chain. The training shall consistently resonate environmental preservation anxiety and
                                    the benefits of promoting ecosystem as key factors in the design of the training programs.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper className={classes.cores} elevation={5}>
                                <Typography style={{padding:'0 0 10px 0'}} align='center' variant='h5'>Self-reliant and entrepreneurship skills outcome based:</Typography>
                                <Typography color='textSecondary'>
                                    SSDO-VTI shall substitute and minimize the moral attitude that promotes social and economic
                                    dependence in the society with employability skills that ignite self-reliance and germination of robust
                                    enterprise development which is driven by the youth. Increasing the capacity and ability of the
                                    society in the advancement and planning processes of entrepreneurship development shall in-turn
                                    strengthen individual and national economic growth. The training shall also attempt to plant into the
                                    society the spirit of entrepreneurship care, value for money and hospitality services.
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>    
            </div>
            <div className={classes.training}>
                <Typography style={{padding:'0 0 20px 0'}} align='center' variant='h4'>Tutors and other Training Staff Capabilities and Abilities:</Typography>
                <Typography color='textSecondary' >
                    SSDO-VTI has a mixture of dynamic and professional administrative and training staff who possess
                    wealth of knowledge and experiences earned over a decade or two decades of innovations and work
                    experience in various disciplines. The wealth of knowledge and experience include: Agriculture
                    Science and Agribusiness Practices, Building and Construction combined with concrete making,
                    carpentry and joinery, plumbing, fittings and paintings, Auto Mechanical Engineering, Electricity
                    and solar pv system electric installations, Catering and Hospitality Management, Hairdressing and
                    Beauty Therapy and Entrepreneurship Development Skills that are relevant to ‘Employability and
                    Self-Skills Development’.
                </Typography>
            </div>
            <div>
                <div className={classes.services}>
                    <Typography style={{padding:'0 0 20px 0'}} align='center' variant='h4'>Other Services that SSDO-VTI Offer:</Typography>
                    <Typography color='textSecondary'>
                        SSDO-VTI also offers conferences services with affordable conference hall of 100 persons’ capacity,
                        standard projector, adequate power supply and dinner at request. The environment is conducive for
                        relaxation and creativity. Join us to pursue a genuine cause for peace in the Republic of South Sudan.
                    </Typography>
                </div>
            </div>
        </div>
     );
}
 
export default About;