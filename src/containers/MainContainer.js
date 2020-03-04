import React, {Component, Fragment} from 'react';
import Table from "../components/Table";
import styles from "./styles.scss";
import store from "../store";
import Axios from "axios";

class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {key: "id", sortable: true, searchable: true},
                {key: "title", sortable: true, searchable: true},
                {key: "body", sortable: false, searchable: true}
            ],
            data: [],
            totalCount:"",
            page:"1",
            pageSize:"10",
            theme:"dark",
        }
    }

    changePageUp=()=>{
       this.setState({page:this.state.page*1+1})
    };

    changePageDown=()=>{
        this.setState({page:this.state.page-1})
    };

    changePage=(event)=>{
        this.setState({page:event.target.value})
    };

    async componentDidMount() {
        let url="http://jsonplaceholder.typicode.com/posts"
        Axios.get(url, {
            params: {
                _start: (this.state.page-1)*this.state.pageSize,
                _limit:this.state.pageSize
            }
        }).then(obj => {
            let data = obj.data;
            this.setState({data:data,totalCount:obj.data.length*this.state.pageSize})
        });
        }



    /*async componentDidMount() {
        this.mounted = true;
        let res = await store.getOtherData({
			pageSize: this.state.pageSize,
            page: this.state.page
		});
            //.catch((err) => {
             //   console.error({err});
            //});
        //console.log(res.headers["x-total-count"]);
        if(res && res.data && this.mounted){
            let data = res.data;
            this.setState({data: data})
        }

        this.setState({totalCount:res.headers["x-total-count"]})



        // store.getOtherData()
        // 	.then((res)=>{
        // 		this.setState({data: res.data})
        // 		console.log(res);
        // 	})
        // 	.catch((err)=>{
        // 		console.log(err);
        // 	});
    }*/

    componentDidUpdate(prevProps, prevState) {
    this.state.page !== prevState.page? this.componentDidMount():null
    }

    componentWillUnmount() {
        this.mounted = false;

    }


    render() {
        return (
            <Fragment>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.colMd9}>
                            <Table
                                pageSize={this.state.pageSize}
                                totalCount={this.state.totalCount}
                                page={this.state.page}
                                changePage={this.changePage}
                                changePageUp={this.changePageUp}
                                changePageDown={this.changePageDown}
                                theme={this.state.theme}
                                data={this.state.data}
                                columns={this.state.columns}
                            />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default MainContainer;
