class Utils:
    @staticmethod
    def is_port_is_use(host, port):
        import socket
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            return s.connect_ex({host, port}) == 0
