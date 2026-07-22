import express from 'express'

const app = express()
const port =3000
app.use(express.json())

let teadata =[]
let nextId =1
// add a new ice tea
app.post('/ice-tea', (req, res) => {
    const{name , price} = req.body
    const tea = { id: nextId++, name, price }
    teadata.push(tea)
    res.status(201).send(tea)
})
//get all tea
app.get('/ice-tea', (req, res) => {
    res.status(200).send(teadata)
})


//get a tea with id
app.get('/ice-tea/:id',(req,res)=>{
   const tea = teadata.find( t=> t.id === parseInt(req.params.id))
   if(!tea){
    return res.status(404).send('tea not found')
   }
   res.status(200).send(tea)

})



//update tea
app.put('/ice-tea/:id',(req,res)=>{
    const tea = teadata.find(t => t.id === parseInt(req.params.id))
    
    if(!tea){
    return res.status(404).send('tea not found')
   }

   const {name,price} = req.body
   tea.name = name
   tea.price = price
   res.status(200).send(tea)
})


//delete tea
app.delete('/ice-tea/:id',(req,res)=>{
    const index = teadata.findIndex(t => t.id === parseInt(req.params.id))
    if(index === -1){
        return res.status(404).send('tea not found')
    }
    teadata.splice(index,1)
    res.status(200).send({message: 'tea deleted successfully'})
})


app.listen(port,() =>{
    console.log(`server is running at port : ${port}...`)
})

