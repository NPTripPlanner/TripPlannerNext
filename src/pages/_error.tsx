import { WithTranslation } from "next-i18next"
import { withTranslation } from "../../nexti18n"

interface IProps extends WithTranslation {
    statusCode: any;
}

function ErrorComp(props:IProps){
    const {
        statusCode,
        t,
    } = props;

    return (
        <p>
        {statusCode
            ? t('error-with-status', { statusCode })
            : t('error-without-status')}
        </p>
    )
}

ErrorComp.getInitialProps = async ({ res, err }) => {
    let statusCode:any = null;

    if (res) {
      ({ statusCode } = res)
    } else if (err) {
      ({ statusCode } = err)
    }
    return {
      namespacesRequired: ['common'],
      statusCode,
    }
}

export default withTranslation('common')(ErrorComp);