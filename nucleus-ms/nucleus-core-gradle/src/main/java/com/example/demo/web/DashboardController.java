package com.example.demo.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.demo.model.Dashboard;
import com.example.demo.model.DashboardRequest;
import com.example.demo.model.SharedResource;
import com.example.demo.model.User;
import com.example.demo.repository.ComponentRepository;
import com.example.demo.repository.DashboardRepository;
import com.example.demo.repository.SharedResourceRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.DashboardService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/nucleus_core/v1/dashboard")
public class DashboardController {

	@Autowired
	private DashboardService dashboardService;

	@Autowired
	private SharedResourceRepository sharedResourceRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private DashboardRepository dashboardRepository;

	@Autowired
	private ComponentRepository componentRepository;
	RestTemplate rest = new RestTemplate();

	@PostMapping(value = "/store_dashboard")
	public Dashboard storeDashboard(@RequestBody DashboardRequest request) {

		return dashboardService.saveDashboardDetails(request);
	}

	@PostMapping(value = "/get_dashboards")
	public List<Dashboard> getDashboards(@RequestBody int user_id) {
		return dashboardService.getAllDashboards(user_id);
	}

	@PostMapping(value = "/delete_dashboard/{user_id}")
	public List<Dashboard> deleteReport(@RequestBody int dashboard_id, @PathVariable int user_id) {
		System.out.println(dashboard_id);
		Dashboard dashboard = dashboardRepository.findById(dashboard_id).get();
		User user = userRepository.findById(user_id).get();
		sharedResourceRepository.deleteByUserAndDashboard(user, dashboard);
		List<SharedResource>listOfSharedResource=this.sharedResourceRepository.findByDashboards(dashboard);
		if(listOfSharedResource.size()==0) {
			dashboardRepository.delete(dashboard);
			componentRepository.deleteByDashboard(dashboard);
		
		}
		List<Dashboard> list = sharedResourceRepository.findDashboardByUser(user);
		System.out.println(list);
//		Map<String,String>map= new HashMap<>();
//		map.put("message", "success");
		return list;
	}

	@PostMapping(value = "/privilege/{username}/{flag}")
	public ResponseEntity<String> givePrivilege(@RequestBody int dashboard_id, @PathVariable String username,
			@PathVariable String flag) {
		User user = userRepository.findByUsername(username);
		Dashboard dashboard = dashboardRepository.findById(dashboard_id).get();
		if (flag.equals("add")) {
			SharedResource newResource = new SharedResource();
			if (user.getRole().equals("ROLE_DEV")) {
				System.out.println("in dev");
				newResource.setPrivileges("edit");
				newResource.setDashboard(dashboard);
				newResource.setUser(user);
			} else {
				newResource.setPrivileges("read");
				newResource.setDashboard(dashboard);
				newResource.setUser(user);
			}
			sharedResourceRepository.save(newResource);
		} else {
			sharedResourceRepository.deleteByUserAndDashboard(user, dashboard);
			List<SharedResource>listOfSharedResource=this.sharedResourceRepository.findByDashboards(dashboard);
			if(listOfSharedResource.size()==0) {
				dashboardRepository.delete(dashboard);
				componentRepository.deleteByDashboard(dashboard);
			}

		}
		return new ResponseEntity<String>(HttpStatus.OK);
	}

}