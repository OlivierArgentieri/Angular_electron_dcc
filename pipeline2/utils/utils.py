class Utils:
    @staticmethod
    def is_port_is_use(host, port):
        import socket
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        try:
            sock.bind((host, port))
            return True
        except Exception, socket_error:
            msg = "Socket Server, Failed to open port: {}".format(socket_error)
            return False

    @staticmethod
    def get_unused_ports(host, start_port, end_port):
        available_ports = []
        ports = range(start_port, end_port)
        
        for i in ports:
            if(Utils.is_port_is_use(host, i)):
                available_ports.append(i)

        available_ports.sort()
        return available_ports