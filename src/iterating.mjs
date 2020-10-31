import setText , {appendText} from './results.mjs';

export async function get(){
    const {data} = await axios.get("http://localhost:3000/orders/1");
    setText(JSON.stringify(data));
}

export async function getCatch(){
    try {
        const {data} = await axios.get("http://localhost:3000/orders/132");
        setText(JSON.stringify(data));
    }
    catch(err){
        setText(err);
    }

}

export async function chain(){
    const {data} =  await axios.get("http://localhost:3000/orders/1");
    const { data : address} = await axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`);
    setText(`City : ${JSON.stringify(address.city)}`)

}

export async function concurrent() {
    const orderStatues = axios.get("http://localhost:3000/orderStatuses");
    const orders = axios.get("http://localhost:3000/orders");

    setText(" ");

    const {data : orderStatus} = await orderStatues;
    const {data : order} = await orders;

    appendText(JSON.stringify(orderStatus));
    appendText(JSON.stringify(order));
}

export async function parallel(){
    setText("");

    await Promise.all([
        ( async () => {
            const {data} = await axios.get("http://localhost:3000/orderStatuses");
            appendText(JSON.stringify(data))

        }) (),
        ( async () =>{
            const {data} = await axios.get("http://localhost:3000/orders");
            appendText(JSON.stringify(data))
        }) ()
    ])

}


