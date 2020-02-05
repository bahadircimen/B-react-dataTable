import React, {Component} from 'react';
import styles from './styles.scss';


class Table extends Component {
    render() {
        const {id,name,age,email}=this.props;

        return (
            <div>
                <table>
                    <tr>
                        <td>
                            {id}
                        </td>
                        <td>
                            {name}
                        </td>
                        <td>
                            {age}
                        </td>
                        <td>
                            {email}
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default Table;