const agentMiddleware = async (req, res, next) => {

    try{

        if(req.user.role !== "Agent"){

            return res.status(403).json({
                success:false,
                message:"Access denied. Agent only."
            });

        }

        next();

    }

    catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

}

export default agentMiddleware;