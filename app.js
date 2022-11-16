const Koa = require('koa');
const KoaRouter = require('koa-router');
const koaJson = require('koa-json');
const bodyparser = require('koa-bodyparser');
const Customer = require('./models/db/customer');
const knex = require('./util/database');
const validation = require('./validation');
const customerModel = require('./models/body/customer');

const app = new Koa();
const router = new KoaRouter();
const port = process.env.PORT || 6000;


router.post('/insert', async ctx => {
    const {names, email} = ctx.request.body;
    const loEmail = email.toLowerCase();
    const {error} = validation.customerValidation(customerModel.customerInsert(names, email));

    if(error) {
        ctx.body = {
            message: error.details[0].message.replace(/"/g, ''),
            code: 400
        }
        ctx.status = 400;
        return;
    }

    try {
        const customer = await Customer.query().insert({
            names: names,
            email: loEmail
        });
        
        ctx.body = {
            message: 'customer added',
            customer: customer,
            code: 200
        }; 
        
    }catch(err) {
        ctx.body = {
            error: err.data,
            code: 400
        }
        ctx.status = 400;
    }
});

router.get('/customers', async ctx => {
    const customers = await Customer.query();
    ctx.body = {
        code: 200,
        customers: customers
    }
    ctx.status = 200;
});

router.patch('/update', async ctx => {
    const {email, names, id} = ctx.request.body;
    const loEmail = email.toLowerCase();
    const result = await Customer.query().updateAndFetchById(id, {
        names: names,
        email: loEmail 
    });

    if(result) {
        ctx.body = {
            message: 'updated successfully',
            code: 200
        }
        ctx.status = 200; 
    }else {
        ctx.body = {
            message: 'User not found',
            code: 404
        }
        ctx.status = 404;
    }
});

router.post('/addOrder', async ctx => {
    const order = await Customer.relatedQuery('order')
                        .for(customer.id)
                        .insert({total: 90});
                        console.log(order);
});

app.use(koaJson());
app.use(bodyparser());
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => console.log(`Server is started on http://localhost:${port} ...`));

