import React, {PropTypes, Component} from 'react';
import classnames from 'classnames';
import Ink from 'react-ink'

class DownloadFile_icon extends Component {
    static propTypes = {
        theme: PropTypes.shape({
            icon: PropTypes.string
        })
    }

    render() {
        const { theme } = this.props;

        return (
            <div className={theme.icon}>
                <Ink opacity={1} radius={1000} />
                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.2 20c0 10.385 8.416 18.8 18.8 18.8 10.385 0 18.8-8.416 18.8-18.8C38.8 9.615 30.384 1.2 20 1.2 9.615 1.2 1.2 9.616 1.2 20zM0 20C0 8.954 8.952 0 20 0c11.046 0 20 8.952 20 20 0 11.046-8.952 20-20 20C8.954 40 0 31.048 0 20zm30.333-1.245c-.35 0-.63.275-.63.618v5.62c0 1.53-1.267 2.77-2.82 2.77H13.08c-1.556 0-2.82-1.246-2.82-2.77V19.28c0-.342-.28-.616-.63-.616-.348 0-.628.274-.628.617v5.713c0 2.21 1.832 4.005 4.078 4.005h13.806c2.252 0 4.08-1.8 4.08-4.005v-5.62c0-.34-.28-.618-.63-.618zM19.54 24.092c.12.12.283.183.44.183.16 0 .323-.06.444-.183l4-3.927c.246-.243.246-.632 0-.874-.248-.242-.644-.242-.89 0l-2.923 2.875V9.63c0-.344-.28-.62-.63-.62-.348 0-.628.276-.628.62v12.535l-2.927-2.874c-.247-.242-.643-.242-.89 0-.247.243-.247.632 0 .875l4.004 3.927z" fill="#4E5768" fillRule="evenodd"/>
                </svg>
            </div>
        )
    }
}


export default DownloadFile_icon

