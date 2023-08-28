
import { Button, FormControl, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { Axios } from 'axios';
import * as React from 'react';
import ImageDialog from './ImageDialog';
import { useState } from 'react';
import apiHelper from '../../Common/Apihelper';
import MoreImageDialog from './MoreImageDialog';

export default function ProductScreen() {

    const [open, setOpen] = useState(false)
    const [image, setImage] = useState([])
    const [featureImage, setFeatureImage] = useState({})



    const fetchMediaHandller = async () => {
        try {
            const result = await apiHelper.showImages()

            setImage(result.data.images)
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div>

            <div className='row'>
                <div className=" col-12 col-md-7 ">
                    <h4 className=''>Add New Product</h4>
                </div>
                <div className="col-6 col-md-3 d-flex align-items-center col-sm-gap-5">
                    <Switch />
                    <p className='mb-0'>Published</p>
                </div>

                <div className="col-2">
                    <Button variant="outlined" className='py-2'>Add product</Button>
                </div>

            </div>

            <div className='row p-4'>
                <div className='col-12 col-md-4'>
                    {/* <p className='mb-0 fw-bold'>Title</p> */}
                    <TextField id="outlined-basic" label="Title" variant="outlined" className='w-100' />
                </div>
                <div className='col-12 col-md-4'>
                    {/* <p className='mb-0 fw-bold'>Blog Name</p> */}
                    <TextField id="outlined-basic" label="Blog Name" variant="outlined" className='w-100' />
                </div>
                <div className='col-12 col-md-4'>
                    {/* <p className='mb-0 fw-bold'>Form Name</p> */}
                    <TextField id="outlined-basic" label="Form Name" variant="outlined" className='w-100' />
                </div>
            </div>



            <div className='row'>
                <div className='col-12 col-md-8 rows'>
                    <div className='col-12'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <h6 className='fw-bold'>Content</h6>
                            <Button variant='outlined' className=''>Show Product</Button>
                        </div>

                    </div>

                    <div className='col-12 mt-3'>
                        <Editor
                            // onInit={(evt, editor) => contentRef.current = editor}
                            // initialValue={postData.content}
                            apiKey="0br1siz57qb0y7dwnxtzccahui7x0el1mj2ygoziavfnzohu"
                            init={{
                                selector: 'textarea',
                                height: 500,
                                mobile: {
                                    theme: 'mobile',
                                    plugins: 'autosave lists autolink',
                                    toolbar: 'undo bold italic styleselect'
                                },
                                menubar: true,
                                plugins: ['print preview paste importcss searchreplace autolink save directionality code visualblocks visualchars image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',],
                                toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | preview save print | insertfile image media template link anchor code codesample | ltr rtl',
                                content_style: 'body {font - family:Helvetica,Arial,sans-serif; font-size:14px }',
                                images_upload_handler: async (blobInfo, success, failure, _) => {
                                    const file = blobInfo.blob()
                                    let formdata = new FormData()
                                    formdata.append("file", file)
                                    const body = formdata
                                    const data = await Axios.post("/api/media", body)
                                    if (data.status === 200) {
                                        success(data.data.url)
                                    }
                                }
                            }}
                        /> </div>

                </div>

                <div className='col-12 col-md-4'>
                    <p className='mb-0 p-0 fw-bold'>Upload Media</p>
                    <label
                        htmlFor='file'
                        style={{ width: "100%", height: "200px", position: "relative", top: "30px", }}
                        className='border border-dark'>
                        {
                            featureImage._id && <img src={featureImage.url} className='h-100 w-100'/> 
                        }
                    </label>
                    {/* <Button variant='contained' className='mt-5 w-100 mb-3'>ADD FEATURE IMAGE</Button> */}
                    <ImageDialog fetchMediaHandller={fetchMediaHandller} image={image} setFeatureImage={setFeatureImage} />
                    <MoreImageDialog image={image}/>
                    <FormControl fullWidth className='mt-3'>
                        <InputLabel  >Select product</InputLabel>
                        <Select placeholder="select product">
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </div>






            </div>
        </div>
    );
}