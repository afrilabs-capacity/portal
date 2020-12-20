import React,{useContext,useEffect,useState} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import ArticleProvider from "../context/ArticleContext"

const RichText =({actionType})=> {
  const {setSelectedImageGlobal,selectedImageGlobal,currentArticle,editMode,article,updateArticle,modal,setModal,setFeaturedFor}=useContext(ArticleProvider.Context)

 let key="xxx"


const [myEditor,setMyEditor]=useState(null)


 useEffect(()=>{
  myEditor!==null & selectedImageGlobal!=="" && myEditor.insertContent('<img alt="article image" class="mce-responsive" src="' + selectedImageGlobal + '"/>')
  //alert(myEditor)
 
 },
 [myEditor,selectedImageGlobal])

  const setUpdateModeOrNot=()=>{

    if(actionType=="en" && editMode=="update" && article.body_en!==null){
      key=Math.random()
      console.log("Editor key",key)
      return  article.body_en

    }

    if(actionType=="fr" && editMode=="update" && article.body_fr!==null){
      key=Math.random()
      console.log("Editor key",key)
      return  article.body_fr

    }

    return ""


  }


  const handleEditorChange = (content) => {
    actionType=="en" ? updateArticle("body_en", content):  updateArticle("body_fr", content)
  }

  
    return (
      <>
      {/* <input id="my-file" type="file" name="my-file" style={{display:"none"}} onChange="" /> */}

      <Editor
      
      apiKey="mymryl9rtn2npjz2vhp3yovdx2of4phahbqil1sq29upca83"
       value={setUpdateModeOrNot()}
      
   
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image',
            'charmap print preview anchor help',
            'searchreplace visualblocks code',
            'insertdatetime media table paste wordcount'
          ],
        
        
        setup:function (editor) {

        editor.ui.registry.addButton('gallery', {
          icon: 'image',
          //image: 'http://p.yusukekamiyamane.com/icons/search/fugue/icons/calendar-blue.png',
          tooltip: "Add Image",
          onAction:()=> {
            setModal(true)
            setMyEditor(editor)
            setFeaturedFor("")
            //
            }
        });
    },
         
        toolbar: 'gallery | insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |  table | print preview ',
              
              file_browser_callback_types: 'image',
              file_picker_callback: function (callback, value, meta) {
                if (meta.filetype == 'image') {
                    var input = document.getElementById('my-file');
                    input.click();
                    input.onchange = function () {
                        var file = input.files[0];
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            console.log('name',e.target.result);
                            callback(e.target.result, {
                                alt: file.name
                            });
                        };
                        reader.readAsDataURL(file);
                    };
                }
            },
            content_style: 'img { width:100%}',
            image_dimensions: false,
            image_class_list: [
    {title: 'None', value: 'mce-responsive'},

  
  ],
  contextmenu: 'link image table',
              paste_data_images: true,

              }}

        onEditorChange={(e)=>handleEditorChange(e)}

        
      /></>
    );

}

export default RichText;