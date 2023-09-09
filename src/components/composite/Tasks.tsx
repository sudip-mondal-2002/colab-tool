import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

export function Tasks({task}:{
    task: {
        Email: string
        workspace: String
        title: String  
        description: String
        status: String
        priority: String
    }
}) {
  return (
    <Box>
      <Card sx={{ width: 1000,height: 160 }}>
      <Typography variant="h5" component="div" color="blue" >
        {task.Email}    
        </Typography>  
        <Typography variant="h5" component="div" color="blue"> 
        {task.workspace}   
        </Typography>
        <Typography variant="h5" component="div" color="blue">      
        {task.title} 
        </Typography>
        <Typography variant="h5" component="div" color="blue">
        {task.description} 
        </Typography>
        <Typography variant="h5" component="div" color="blue">
        {task.status}   
        </Typography> <Typography variant="h5" component="div" color="blue">
        {task.status}   
        </Typography>
         <Typography variant="h5" component="div" color="blue">
        {task.priority}   
        </Typography>
      </Card>

      <Box 
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
      >
        •
      </Box>
    </Box>
  )
}


