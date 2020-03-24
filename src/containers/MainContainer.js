import React, {Component, Fragment, useEffect, useState} from 'react';
import Table from "../components/Table";
import styles from "./styles.scss";
import store from "../store";
import Axios from "axios";
import Pagination from "../components/Pagination";
import Card from "../components/Card";
import Skeleton from "../components/Skeleton";

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
            totalCount:"100",
            page:"1",
            pageSize:"10",
            theme:"light",
            photosCol:[],
            photos:[],
            loading: true,
            prevY:0
        }
    }

    changeTheme = (event) =>{
        this.setState({
            theme: event.target.value
        })
    };

    changePage=(change, isPageNumber = false)=> {
        let {page} = this.state;
        this.setState({page: isPageNumber ? change : page*1 + change});
    };

    changePageSize=(event)=>{
        this.setState({pageSize:event.target.value, page:1});
    };


    // async componentDidMount() {
    //     let res = await store.getOtherData({page: this.state.page, pageSize: this.state.pageSize});
    //     let totalCount = res.headers["x-total-count"];
    //     let data = res.data;
    //     this.setState({data, totalCount})
    // }

    handleScroll = () => {
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight?
            this.setState({page:this.state.page*1+1}):null;
    };

    async componentDidMount() {
        this.setState({ loading: true });
        store.getData({page:this.state.page}).then(res => {
            this.setState({photos:[...this.state.photos,...res.data], loading: false});
        }).catch(err => {
            this.setState({loading: true});
        });
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.page !== prevState.page||this.state.pageSize!==prevState.pageSize) {
            this.setState({ loading: true });
            store.getData({page:this.state.page}).then((res) => {
                this.setState({photos:[...this.state.photos,...res.data], loading: false});
            });
        }
    }

    renderSkeleton() {
        let dummyPhotos = [1,2,3,4,5];

        return dummyPhotos.map((e, i) => {
            return (
                <div className={styles.colMd3}>
                    <Skeleton/>
                </div>
            );
        });
    }

    renderCard() {
        let {photos} = this.state;

        return photos.map((d,index) => {
            return (
                <div key={index} className={styles.colMd3}>
                    <Card
                        author={d.author}
                        download_url={d.download_url}
                        width={d.width}
                        height={d.height}
                    />
                </div>
            );
        });
    }

    render() {
        let {theme, loading, photos} = this.state;
        return (
            <Fragment>
                <div className={styles[`container${theme}`]}>
                    <div className={styles.row}>
                        {this.renderCard()}
                        {(loading || !photos.length) && this.renderSkeleton()}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default MainContainer;
