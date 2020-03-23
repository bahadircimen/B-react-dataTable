import React, {Component} from 'react';
import styles from "./styles.scss";



class Card extends Component {
    render() {
        let {author,download_url,width,height}=this.props;
        let a=download_url.split("/");
        let b=[];
            b.push(a);
            b.map(d=>{return d});
        //let b=a.map(d=>{return d[0]});
        console.log(b);
        return (
            <div>
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        {author}
                    </div>
                    <div className={styles.cardBody}>
                        <img src={download_url} alt="" style={{width:"280px",height:`${height/(width/280)}px`}}/>
                        {height/(width/280)}
                    </div>
                    <div className={styles.cardFooter}>

                    </div>
                </div>
            </div>
        );
    }
}

export default Card;