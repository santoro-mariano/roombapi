namespace RoombAPI.Server
{
    using System.Collections.Generic;
    using System.Threading;
    using System.Threading.Tasks;
    using Grpc.Core;
    using Microsoft.Extensions.Hosting;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.Options;
    using RoombAPI.Core;
    using RoombAPI.Server.Configuration;
    
    public class RoombAPIServer: IHostedService
    {
        private readonly ILogger<RoombAPIServer> logger;
        private readonly IRoomba roomba;
        private readonly GrpcServerOptions options;
        private readonly Server server;

        public RoombAPIServer(ILogger<RoombAPIServer> logger,
                              IRoomba roomba,
                              IOptions<GrpcServerOptions> options,
                              IEnumerable<ServerServiceDefinition> serviceDefinitions)
        {
            this.logger = logger;
            this.roomba = roomba;
            this.options = options.Value;
            var serverPort = new ServerPort(options.Value.Address, options.Value.Port, ServerCredentials.Insecure);
            this.server = new Server();
            this.server.Ports.Add(serverPort);
            foreach (var definition in serviceDefinitions)
            {
                this.server.Services.Add(definition);
            }
        }
        
        public async Task StartAsync(CancellationToken cancellationToken)
        {
            await this.roomba.Init();
            this.server.Start();
            this.logger.LogInformation($"RoombAPI server listening on port {this.options.Port}");
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            this.logger.LogInformation("Stopping RoombAPI server...");
            return this.server.ShutdownAsync();
        }
    }
}