import os
import subprocess
import time
import socket
import sys

jdk_bin = r'D:\Programs\jdk-17\bin'
java = os.path.join(jdk_bin, 'java.exe')
server_dir = r'D:\avatarweb2d\Avatar-Sv-master-master'
classes_dir = os.path.join(server_dir, r'target\classes')

cp = [
    classes_dir,
    r'C:\Users\Dshare\.m2\repository\com\googlecode\json-simple\json-simple\1.1\json-simple-1.1.jar',
    r'C:\Users\Dshare\.m2\repository\log4j\log4j\1.2.17\log4j-1.2.17.jar',
    r'C:\Users\Dshare\.m2\repository\mysql\mysql-connector-java\8.0.27\mysql-connector-java-8.0.27.jar',
    r'C:\Users\Dshare\.m2\repository\com\zaxxer\HikariCP\4.0.3\HikariCP-4.0.3.jar',
    r'C:\Users\Dshare\.m2\repository\org\slf4j\slf4j-api\1.7.36\slf4j-api-1.7.36.jar',
    r'C:\Users\Dshare\.m2\repository\commons-dbutils\commons-dbutils\1.7\commons-dbutils-1.7.jar',
    r'C:\Users\Dshare\.m2\repository\commons-io\commons-io\2.7\commons-io-2.7.jar',
]
cp_str = ';'.join(cp)

log_path = os.path.join(server_dir, 'server_live.log')
with open(log_path, 'w', encoding='utf-8') as log_f:
    cmd = [
        java,
        '-cp', cp_str,
        'avatar.server.Avatar'
    ]
    print('Starting Java Server on 127.0.0.1:19128...')
    p = subprocess.Popen(cmd, cwd=server_dir, stdout=log_f, stderr=log_f)

    # Monitor until port 19128 is open
    for i in range(60):
        time.sleep(1)
        s = socket.socket()
        try:
            s.connect(('127.0.0.1', 19128))
            s.close()
            print(f'Java Server is UP and listening on port 19128! (took {i+1}s)')
            sys.exit(0)
        except Exception:
            pass

    print('Server did not open port 19128 in 60s!')
    sys.exit(1)
