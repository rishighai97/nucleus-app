package com.example.demo.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.demo.model.Report;
import com.example.demo.model.ReportRequest;
import com.example.demo.model.SharedResource;
import com.example.demo.model.User;
import com.example.demo.repository.ReportRepository;
import com.example.demo.repository.SharedResourceRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.ReportService;
import com.example.demo.service.UserService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/nucleus_core/v1/report")
public class ReportController {

	@Autowired
	private ReportService reportService;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private ReportRepository reportRepo;

	@Autowired
	private SharedResourceRepository sharedRepo;

	RestTemplate rest = new RestTemplate();

	@PostMapping(value = "/store_report")
	public Report storeReport(@RequestBody ReportRequest request) {
		return reportService.saveReportDetails(request);
	}

	@PostMapping(value = "/get_reports")
	public List<Report> storeReport(@RequestBody int user_id) {
		return reportService.getAllReports(user_id);
	}

	@PostMapping(value = "/delete_report/{user_id}")
	public List<Report> deleteReport(@RequestBody int report_id, @PathVariable int user_id) {
		System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
		System.out.println(report_id);
		Report report = reportRepo.findById(report_id).get();
		User user = userRepo.findById(user_id).get();
		sharedRepo.deleteByUserAndReport(user, report);
		List<SharedResource>listOfSharedResource=this.sharedRepo.findByReports(report);
		if(listOfSharedResource.size()==0)
		reportRepo.delete(report);


		List<Report> list = sharedRepo.findReportsByUser(user);
		System.out.println(list);
//		Map<String,String>map= new HashMap<>();
//		map.put("message", "success");
		return list;
	}

	// Report Controller --Give/Edit Permissions
	@PostMapping(value = "/privilege/{username}/{flag}")
	public ResponseEntity<String> givePrivilege(@RequestBody int report_id, @PathVariable String username,
			@PathVariable String flag) {
		User user = userRepo.findByUsername(username);
		Report report = reportRepo.findById(report_id).get();
		if (flag.equals("add")) {
			SharedResource newResource = new SharedResource();
			if (user.getRole().equals("ROLE_DEV")) {
				newResource.setPrivileges("edit");
				newResource.setReport(report);
				newResource.setUser(user);
			} else {
				newResource.setPrivileges("read");
				newResource.setReport(report);
				newResource.setUser(user);
			}
			sharedRepo.save(newResource);
		} else {
			sharedRepo.deleteByUserAndReport(user, report);
			List<SharedResource>listOfSharedResource=this.sharedRepo.findByReports(report);
			if(listOfSharedResource.size()==0)			
			reportRepo.delete(report);

		}
		return new ResponseEntity<String>(HttpStatus.OK);
	}
}
