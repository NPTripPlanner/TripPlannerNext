import { WithTranslation, withTranslation } from 'next-i18next';
import {Link} from '../../nexti18n';

export interface IProps extends WithTranslation {

}

function PageNotFound(props:IProps) {
    const {
        t,
    } = props;

    return (
        <div>
            {t('pageNotFound')}
            <br/>
            <Link href='/'>
                <a>{t('home')}</a>
            </Link>
        </div>
    );
};

// PageNotFound.getInitialProps = async ()=>{
//     console.log('404 get initial props')
//     return({
//         namespacesRequired: ['common', '404', 'navbar'],
//     })
// }

export default withTranslation('common')(PageNotFound);