import React from 'react'
import {useQuery,useMutation} from "@apollo/react-hooks"
import gql from "graphql-tag"



const Upload = (props) => {
    const [addfile, { data }]  = useMutation(SINGLE_UPLOAD_MUTATION);
    const onChange = ({target: {validity,files: [file],},}) =>
        validity.valid && addfile({ variables: { file } }).then((res) => {
            console.log(res);
     });
      
      // const onChange = (e)=>{
      // 
      //     addfile({variables: })
      // }
      if(data){
          window.alert(data.uploadFichier)
      }
    return( 
        <>
        <div className="submit-field">
        
        <div className="uploadButton margin-top-30">
            <input
                className="uploadButton-input"
                type="file"
                accept="image/*, application/pdf"
                id="upload"
                onChange={onChange}
                
            />
            <label
                className="uploadButton-button ripple-effect"
                htmlFor="upload"
            >
                Télécharger des fichiers
            </label>
            <span className="uploadButton-file-name">
                Images ou documents pouvant être utiles pour décrire votre travail
            </span>
        </div>
    </div>
    
    
    
    </> 
    ) 
} 
export default Upload

const SINGLE_UPLOAD_MUTATION = gql`
  mutation singleUpload($file: Upload!) {
    uploadFichier(file: $file)
  }
`;
