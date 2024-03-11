class Config 
{
    static get(key)
    {
        const config = {
            URL_API : import.meta.env.VITE_URL_API || "http://localhost:3000/api/v1/",
            VERSION : import.meta.env.VITE_VERSION || "@2024"
        };
  
        return config[key] || null;
    }
}
  
export default Config;
