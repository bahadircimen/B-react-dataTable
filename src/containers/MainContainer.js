import React, {Component, Fragment, useEffect, useState} from 'react';
import Table from "../components/Table";
import styles from "./styles.scss";
import store from "../store";
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
            loading:false,
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
        window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
            ?this.setState({page:this.state.page*1+1})
            :null;
    };

        async componentDidMount() {
        this.setState({ loading: true });
        let res = await store.getData({page:this.state.page});
        let data = res.data;
        this.setState({photos:[...this.state.photos,...data],loading:false});
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    componentDidUpdate(prevProps, prevState) {
    this.state.page !== prevState.page||this.state.pageSize!==prevState.pageSize? this.componentDidMount():null;
        window.addEventListener('scroll', this.handleScroll);
    }

    renderSkeleton() {
        let dummyPhotos = [];
        for (let i=1; i<13; i++)
            dummyPhotos.push(i);
        return dummyPhotos.map(d => {
            return (
                <div key={d} className={styles.colMd3}>
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
        let {theme} = this.state;
        return (
            <Fragment>
                <div className={styles[`container${theme}`]}>
                    <div className={styles.row}>

                        {/*<div className={styles.colMd9}>*/}
                        {/*    <Table*/}
                        {/*        theme={this.state.theme}*/}
                        {/*        changeTheme={this.changeTheme}*/}
                        {/*        data={this.state.data}*/}
                        {/*        columns={this.state.columns}*/}
                        {/*    />*/}
                        {/*    <Pagination*/}
                        {/*        page={this.state.page}*/}
                        {/*        pageSize={this.state.pageSize}*/}
                        {/*        totalCount={this.state.totalCount}*/}
                        {/*        changePage={this.changePage}*/}
                        {/*        changePageUp={this.changePageUp}*/}
                        {/*        changePageDown={this.changePageDown}*/}
                        {/*        changePageSize={this.changePageSize}*/}
                        {/*    />*/}
                        {/*</div>*/}

                        {this.renderCard()}
                        {(this.state.loading || !this.state.photos.length) && this.renderSkeleton()}

                    </div>
                </div>
            </Fragment>
        );
    }
}

export default MainContainer;
