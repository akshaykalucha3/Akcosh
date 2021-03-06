import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import './quill.bubble.css';
import './blogarticle.css'
import axios from 'axios';
import Loading from '../Home/Loading';
import { connect } from 'react-redux';



function BlogArticle(props) {




function ConvLstToDate(arr){
    /*eslint-disable*/
    let dateStr = ''
    if(arr[1]===1){ return dateStr=`January ${arr[0]}, ${arr[2]}`}else if(arr[1]===2){ return dateStr=`Feb ${arr[0]}, ${arr[2]}`}
    else if(arr[1]===3){ return dateStr=`March ${arr[0]}, ${arr[2]}`}else if(arr[1]===4){ return dateStr=`April ${arr[0]}, ${arr[2]}`}
    else if(arr[1]===5){ return dateStr=`May ${arr[0]}, ${arr[2]}`}else if(arr[1]===6){ return dateStr=`June ${arr[0]}, ${arr[2]}`}
    else if(arr[1]===7){ return dateStr=`July ${arr[0]}, ${arr[2]}`}else if(arr[1]===8){ return dateStr=`August ${arr[0]}, ${arr[2]}`}
    else if(arr[1]===9){ return dateStr=`September ${arr[0]}, ${arr[2]}`}else if(arr[1]===10){ return dateStr=`October ${arr[0]}, ${arr[2]}`}
    else if(arr[1]===11){ return dateStr=`November ${arr[0]}, ${arr[2]}`}else if(arr[1]===12){ return dateStr=`December ${arr[0]}, ${arr[2]}`}
}


    const [BlogData, SetBlogData] = useState(null)

    let blogTitlt = ''
    useEffect(()=>{
        /*eslint-disable*/
        var blogTitleUrl = document.location.pathname.substring(document.location.pathname.lastIndexOf('/') + 1)
        blogTitlt = blogTitleUrl
        let titlearr = blogTitlt.split('-')
        blogTitlt = titlearr.join(' ')
        axios.get(`https://akshayreactportfoliobackend.herokuapp.com/api/v1/backend1/test1/${blogTitlt}/`)
        .then(res => {
            let genricDate = res.data.Data.Created.substring(0, res.data.Data.Created.indexOf('T')).split('-').reverse().join('/')
            let dateArr = res.data.Data.Created.substring(0, res.data.Data.Created.indexOf('T')).split('-').reverse()
            dateArr = dateArr.map(Number)
            genricDate = ConvLstToDate(dateArr)
            let resData = {
                "Date": genricDate,
                "deltaData": JSON.parse(res.data.Data.deltaData),
                "tags": res.data.Data.tags
            }
            SetBlogData(resData)
        })
        .catch(err=>console.log(err))
        }, [])
  
    return (
        <div>
            {
            BlogData ?
            <div style={ props.isDark ? {backgroundColor:"#212121", borderBottom:"none"} : null } className="mainBlog">
                <div className="textView">
                    <div className="tags__view">
                        {BlogData.tags.map((tag, key) => 
                            <a key={key} className={`blogTag ${tag}`} href="/">{tag}</a>
                        )}
                    </div>
                    <div className="dates_views">
                        <p style={ props.isDark ? {color:"white"} : null }><i>{BlogData.Date}</i></p>
                    </div>
                    <ReactQuill
                    style={ props.isDark ? {backgroundColor:"#2b2a2a", color:"white"} : null }
                    value={BlogData.deltaData}
                    modules={{syntax: true}}
                    readOnly={true}
                    theme={"bubble"}
                    />
                </div>
            </div>
            : 
            <div className="loadingDIv">
                <Loading />
            </div> 
            }


        </div>
    )
}


const mapStateToProps = state => {
    return{
        isDark: state.WebsiteInterface.isDark
    }
}
const mapDispatchToProps = dispatch => {
    return {
    }}


export default connect(mapStateToProps, mapDispatchToProps)(BlogArticle)