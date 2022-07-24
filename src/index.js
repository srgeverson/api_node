import { http } from './core/http';

const PORT = process.env.PORT || 8080;

http.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));