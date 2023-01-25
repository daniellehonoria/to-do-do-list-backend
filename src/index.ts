import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from './database/knex'
import knex from 'knex'
import e from 'express'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

//---------ENDPOINTS BANCO DE DADOS USUARIOS-------------
//busca de usuários
app.get("/users", async (req:Request, res:Response)=>{
    try {
        const list_users = await db("users")
        res.status(200).send({users:list_users})
    } catch (error) {
        console.log(error)
        if(req.statusCode === 200){
            res.status(500)
        } if (error instanceof Error){
            res.send(error.message)
        } else{
            res.send("Erro inesperado")
        }
    }
});
app.delete("/user/:id", async (req:Request, res: Response)=>{
    try{
        const idToDelete =req.params.id
        const [user] =await db("users").where({user_id:idToDelete})//user recebe infos de id e compara se o id passado no params é algum de user_id

        if(user){
            await db("users")
            .del()
            .where({user_id:idToDelete})
        }else{
            res.status(400)
            throw new Error("Id não encontrada")
        }
    res.status(200).send("Usuário removido")
    } catch(error){
        console.log(error)
        
        if (req.statusCode === 200){
            res.send(500)
        }
        if(error instanceof Error){
            res.send(error.message)
        } else{
            res.send("Erro inesperado")
        }
    }
})
app.post("/users",async (req:Request, res:Response) => {
    try {         
        const new_id= req.body.user_id
        const new_name= req.body.name
        const new_email= req.body.email
        const new_password = req.body.password

        if(typeof new_id !== "string" || typeof new_name !== "string" || typeof new_email !== "string" || typeof new_password !== "string"){
            res.status(400)
            throw new Error("Todos os dados devem ser passados em forma de string")
        } 
        if(new_id.length < 1 || new_name.length <1 || new_email.length <1 || new_password.length <1){
            res.status(400)
            throw new Error("Todos os dados devem possuir ao menos 1 caractere")
        }

        const newUser={
            user_id:new_id,
            name:new_name,
            email:new_email,
            password: new_password
        }
        await db("users")
        .insert(newUser)
        res.status(200).send("Usuário cadastrado com sucesso")
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


//---------ENDPOINTS BANCO DE DADOS TAREFAS-------------

//busca de tarefas
app.get("/tasks", async (req:Request, res: Response)=>{
    try {
        const list_tasks = await db("tasks")
        res.status(200).send({tasks:list_tasks})
    } catch (error) {
        console.log(error)
        if(req.statusCode === 200){
            res.status(500)
        } if (error instanceof Error){
            res.send(error.message)
        } else{
            res.send("Erro inesperado")
        }
    }
});

app.delete("/task/:id", async(req:Request, res:Response)=>{
    try {
        const idToDelete = req.params.id
        const [task] = await db("tasks"). where({task_id:idToDelete})

        if(task){
        await db("tasks")
        .del()
        .where({task_id:idToDelete})
        } else{
            res.status(400)
            throw new Error("Id não encontrada")
        }
        res.status(200).send("Tarefa removida")
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
}
});

app.post("/tasks", async(req:Request, res:Response)=>{
    try {
    const new_id = req.body.task_id
    const new_title = req.body.title
    const new_description = req.body.description

    if(typeof new_id !== "string" || typeof new_title !== "string" || typeof new_description !== "string" ){
        res.status(400)
        throw new Error("Todos os dados devem ser passados em forma de string")
    } 
    if(new_id.length < 1 || new_title.length <1 || new_description.length <1  ){
        res.status(400)
        throw new Error("Todos os dados devem possuir ao menos 1 caractere")
    }
    const newTask={
        task_id:new_id,
        title:new_title,
        description:new_description
    }
    await db("tasks").insert(newTask)
    res.status(200).send("Tarefa cadastrada com sucesso")

} catch (error) {
    console.log(error)

    if (req.statusCode === 200) {
        res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
}
});

app.put("/task/:id", async(req:Request, res:Response)=>{
        try {
            const idToEdit = req.params.id
            const new_id = req.body.task_id
            const new_title = req.body.title
            const new_description = req.body.description
        
            if(typeof new_id !== "string" || typeof new_title !== "string" || typeof new_description !== "string" ){
                res.status(400)
                throw new Error("Todos os dados devem ser passados em forma de string")
            } 
            if(new_id.length < 1 || new_title.length <1 || new_description.length <1  ){
                res.status(400)
                throw new Error("Todos os dados devem possuir ao menos 1 caractere")
            }
        const [taskEdit]= await db("tasks").where({task_id:idToEdit})
        if(taskEdit){

            const updateTask={
                task_id:new_id || taskEdit.task_id,
                title:new_title || taskEdit.title,
                description:new_description || taskEdit.description
            }    
         await db("tasks")
        .update(updateTask)
        .where({task_id:idToEdit})
        }else {
            res.status(404)
            throw new Error("'id' não encontrada")
        }
        res.status(200).send("Dados atualizados")
    } catch (error) {
        console.log(error)
        if (req.statusCode === 200) {
            res.status(500)
        }if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})