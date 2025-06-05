// JavaScript module
export const processVYAn = async (params) => {{
    try {{
        const response = await fetch('/api/data/d1pn0C', {{
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
