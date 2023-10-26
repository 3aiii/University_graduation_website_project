const router = require('express').Router()
const conn = require('../server/conn')
const Upload = require('../middleware/Upload')

// QUERY POST
router.get('/getpost',async(req,res)=>{    
    let params = []
    let mysql = `SELECT * FROM category 
    JOIN project ON category.category_id = project.category_id
    JOIN student ON project.student_id = student.student_id  ORDER BY project_id`
    
    conn.query(mysql,params,(err,result,field)=>{
        if(err){
            res.json({status : 'error ',message : err})
        } else{
            res.json({status : 'ok', data : result})
        }
    })
})

// QUERY SINGLE POST
router.get('/:id',async(req,res)=>{
    const id = req.params.id
    let params = [id]
    let mysql = `   
        SELECT * FROM category 
        JOIN project ON category.category_id = project.category_id 
        JOIN student ON project.student_id = student.student_id WHERE project.project_id = ? `
    try {
        conn.query(
            mysql,
            params,
            (err,result,field)=>{
                if(err){
                    res.json({status : 'error',message : err})
                } else{
                    res.json({status : 'ok',data : result})
                }
            }
            )
        } catch (error) {
            res.status(500).json({status : 'error',message : error})            
        }
})

// INSERT POST
router.post('/create', Upload,async (req,res)=>{
    const { student_id, project_name ,project_abstract, project_turnitin ,category_id} = req.body
    const project_img_file = req.files.project_img_file[0].filename; 
    const project_pdf_file = req.files.project_pdf_file[0].filename; 
    const project_pdf_path = req.files.project_pdf_file[0].path;

    let mysql = `INSERT INTO project (student_id, project_name, project_abstract, project_turnitin, category_id, project_img_file, project_pdf_file 
        ,project_pdf_path , project_status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ? ,'Pending')`

    const params = [student_id,project_name,project_abstract,project_turnitin,category_id,project_img_file,project_pdf_file,project_pdf_path]

    try {
        conn.query(
            mysql,
            params,
            (err,result,field)=>{
                if(err){
                    res.json({status : 'error' ,message : err})
                } else{
                    res.json({status : 'ok', data : result})
                }
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).json({status : 'error',message : error})            
    }
})

// APPROVE POST 
router.put('/approve', async(req,res)=>{
    const {project_id} = req.body
    // console.log(project_id);
    let mysql = `UPDATE project
                SET project_status = 'Active' WHERE project_id = ?`
    const params = [project_id]
    
    try {
        conn.query(
            mysql,
            params,
            (err,result,field)=>{
                if(err){
                    res.json({status : 'error' , message : err})
                } else{
                    res.json({status : 'ok' , data : result})                    
                }
            }
        )
        
    } catch (error) {
        res.json({status : 'error'  , message : error})
    }
})


// REJECT POST 
router.put('/reject', async(req,res)=>{
    const {project_id} = req.body
    // console.log(project_id);
    let mysql = `UPDATE project
                SET project_status = 'Reject' WHERE project_id = ?`
    const params = [project_id]
    
    try {
        conn.query(
            mysql,
            params,
            (err,result,field)=>{
                if(err){
                    res.json({status : 'error' , message : err})
                } else{
                    res.json({status : 'ok' , data : result})                    
                }
            }
        )
        
    } catch (error) {
        res.json({status : 'error'  , message : error})
    }
})




module.exports = router