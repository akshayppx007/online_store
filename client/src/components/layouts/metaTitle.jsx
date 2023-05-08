import { Helmet, HelmetProvider } from "react-helmet-async";

 const MetaTitle = ({ title = "e-shop", description="Example description" }) => {
    return (
       <HelmetProvider>
           <Helmet>
              <title>{title}</title> 
              <meta name="description" content={description} />
           </Helmet>
       </HelmetProvider> 
    )
 }

 export default MetaTitle;