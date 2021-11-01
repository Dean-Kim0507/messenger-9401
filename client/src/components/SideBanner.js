import React from 'react';
import {
    Grid
} from "@material-ui/core";

const style_container = {
    width: '41vw',
    height:'100vh',
    //i hpone size
    minWidth: '414px',
    minheight: '667px',
    marginRight:'0'
}

const style_fontBlock = {
    width:'100%',
    position: 'relative',
    top: '27vh',
    margin:0,
    justifyContent:'center',
    color: 'white',
    zIndex: 0,
    fontSize: '2rem',
    textAlign: 'center'
}

const style_layer = {
    width: '41vw',
    height: '100vh',
    position: 'absolute',
    left: 0,
    top:0,
    backgroundColor: '#86B9FF',
    opacity: '85%',
    zIndex: -1,
    minWidth: '414px'
}

const style_icon = {
    margin:'0 0 39px 0',
}

const style_letter = {
    margin:0,
}

const style_imgContainer = {
    width: '41vw',
    height: '100vh',
    position: 'absolute',
    left: 0,
    top:0,
    zIndex: -2,
    minWidth: '414px'
}

const style_img = {
    width: '100%',
    height: '100vh',
    minWidth: '414px'
}


const SideBanner = () => {
    return (
        <Grid style = {style_container}>
        <Grid>
            <Grid style={style_fontBlock} >
                <img style={style_icon} src ='./images/bubble.svg' />
                <p style={style_letter}> Converse with anyone <br />with any language</p>
            </Grid>
            <Grid style={style_layer} />
        </Grid>
            <Grid style={style_imgContainer}>
            <img
                src='./images/bg-img.png'
                alt='side_banner_image'
                style={style_img} />
            </Grid>
        </Grid >
    );
};

export default SideBanner;