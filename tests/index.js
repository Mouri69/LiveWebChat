// JavaScript module
export const processZnQL = async (params) => {{
    try {{
        const response = await fetch('/api/data/H7Sgi7', {{
            method: 'POST',
            headers: {{
                'Content-Type': 'application/json'
            }},
            body: JSON.stringify(params)
        }});
        return await response.json();
    }} catch (error) {{
        console.error('Error:', error);
        throw error;
    }}
}};
