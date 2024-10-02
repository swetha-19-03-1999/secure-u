import { useState } from "react";

const [data, setData] = useState(0);

const sqlDataHookEx= ()=>{

useEffect(() => {
    setTimeout(() => {
        const db = SQLite.openDatabase({ name: 'mydb.db', location: 'default' });
        db.transaction(tx => {
           // tx.executeSql('DELETE FROM users')
            tx.executeSql('SELECT * FROM users', [], (tx, results) => {
                const rows = results.rows;
                for (let i = 0; i < rows.length; i++) {
                    setData(rows.item(i).user_id)
                  //  rows.item(i).status==1?navigation.replace('Home'):navigation.replace('Landing')
                    console.log("splash screen :: "+rows.item(i));
                }
            });
        });

    }, 2000);
}, []);

return [data];
}
export default sqlDataHookEx;