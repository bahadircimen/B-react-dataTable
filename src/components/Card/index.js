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
        return (
            <div>
                {this.props.loading ?<div className={styles.cartt}>sahdbashdbsajbhdsajbhdjsabdjsabdjsa</div>:
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            {author}
                        </div>
                        <div className={styles.cardBody}>
                            <img src={download_url} alt=""
                                 style={{width: "280px", height: `${height / (width / 280)}px`}}/>
                        </div>
                        <div className={styles.cardFooter}>
                            Original Size: {width}*{height}px
                            <a href={download_url}><i className="fas fa-download fa-lg"/></a>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Card;